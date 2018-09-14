const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');

const config = require('./config.json');
const FileSystemHelper = require('./fs-helper');
const GraphicsMagickHelper = require('./gm-helper');

const fileSystemHelper = new FileSystemHelper();
const graphicsMagickHelper = new GraphicsMagickHelper();

const copy = () => {
  return Promise.all(config.copy.map((copyFormat) => {
    const pathFromCopy = path.join(config.srcPath, copyFormat.format);
    const pathToCopy = path.join(config.desPath, copyFormat.format);

    return fileSystemHelper.copy(pathFromCopy, pathToCopy);
  }));
};
const convert = () => {
  const { format, desFolderPath, desFilePath, readableStream } = options;

  fileSystemHelper.mkDirByPathSync(desFolderPath);

  const writeStream = fs.createWriteStream(desFilePath);

  return graphicsMagickHelper.convert(
    size,
    readableStream
  ).stream().pipe(writeStream);
};
const resize = () => {
  const { size, desFolderPath, desFilePath, readableStream } = options;

  fileSystemHelper.mkDirByPathSync(desFolderPath);

  const writeStream = fs.createWriteStream(desFilePath);

  return graphicsMagickHelper.resize(
    size,
    readableStream
  ).stream().pipe(writeStream);
};
const convertAndResize = (options) => {
  const { size, desFolderPath, desFilePath, readableStream, format } = options;

  fileSystemHelper.mkDirByPathSync(desFolderPath);

  const writeStream = fs.createWriteStream(desFilePath);

  return graphicsMagickHelper.convertAndResize(
    size,
    format,
    readableStream
  ).stream().pipe(writeStream);
};
// convert, resize, convert or resize
const transformFiles = () => {
  const srcPath = path.join(config.srcPath, config.defaultExtension);

  return fileSystemHelper.getSourceFiles(srcPath)
    .then((sourceFilesOutput) => {
      config.convertOrResizeFormats.forEach((formatItem) => {
        sourceFilesOutput.files.forEach((file, index) => {
          const srcFilePath = path.join(srcPath, file);
          const desPath = path.join(config.desPath, formatItem.format);
          const outputFileName = `${sourceFilesOutput.fileNames[index]}.${formatItem.format}`;
          const readableStream = fs.createReadStream(srcFilePath);

          fileSystemHelper.mkDirByPathSync(desPath);

          if (formatItem.size && formatItem.size.length !== 0) {
            const maxSize = Math.max(...formatItem.size).toString();

            // convert and resize
            const desFolderPath = path.join(desPath, maxSize);
            const desFilePathMax = path.join(
              desFolderPath,
              outputFileName,
            );
            const convertAndResizeOptions = {
              size: maxSize,
              desFolderPath,
              desFilePath: desFilePathMax,
              readableStream,
              format: formatItem.format,
            };
            const writableStream = convertAndResize(convertAndResizeOptions);

            if (formatItem.size.length > 1) {
              writableStream.on('finish', () => {
                // resize
                formatItem.size.forEach((itemSize) => {
                  if (itemSize === maxSize) {
                    return;
                  }

                  const desFolderPath = path.join(desPath, itemSize);
                  const desFilePath = path.join(
                    desFolderPath,
                    outputFileName,
                  );
                  const readableStream = fs.createReadStream(desFilePathMax);
                  const resizeOptions = {
                    size: itemSize,
                    desFolderPath,
                    desFilePath,
                    readableStream,
                  };

                  resize(resizeOptions);
                });
              });
            }
          } else {
            const desFilePath = path.join(
              desPath,
              outputFileName,
            );
            const convertOptions = {
              format: formatItem.format,
              desFolderPath: desPath,
              desFilePath,
              readableStream,
            };

            convert(convertOptions);
          }
        });
      })
    });
};
const zipFiles = () => {
  const zip = archiver('zip', { zlib: { level: 9 } });
  const desFolderPath = path.join(config.desPath, 'evo-icons.zip');

  zip.on('warning', function(err) {
    if (err.code === 'ENOENT') {
      console.info('zip warning');
    } else {
      throw err;
    }
  });

  zip.on('error', function(err) {
    throw err;
  });

  zip.directory(config.desPath, false);
  zip.pipe(fs.createWriteStream(desFolderPath));
  zip.finalize();
};

fileSystemHelper.remove(config.desPath)
  .then(() => {
    return Promise.all([copy(), transformFiles()]);
  })
  .then(() => {
    zipFiles();
  })
  .catch((error) => {
    const errorMessage = error && error.message ? error.message : `${error}, Smth went wrong`;

    console.error(errorMessage);
  });
