const fs = require('fs');
const path = require('path');

const config = require('./config.json');
const FileSystemHelper = require('./fs-helper');
const GraphicsMagickHelper = require('./gm-helper');

const fileSystemHelper = new FileSystemHelper();
const graphicsMagickHelper = new GraphicsMagickHelper();

const copy = () => {
  return config.copy.map((copyFormat) => {
    const pathFromCopy = path.join(config.srcPath, copyFormat.format);
    const pathToCopy = path.join(config.desPath, copyFormat.format);

    return fileSystemHelper.copy(pathFromCopy, pathToCopy);
  });
};
const convertOrResize = () => {
  return 'convertOrResize';
};

fileSystemHelper.deleteFiles(config.desPath)
  .then(() => {
    return Promise.all([copy(), convertOrResize()]);
  })
  .then((results) => {
    console.log(results);
  })
  .catch((error) => {
    const errorMessage = error && error.message ? error.message : `${error}, Smth went wrong`;

    console.error(errorMessage);
  });

//
/*fileSystemHelper.getSourceFiles(config.srcPath, 'svg')
  .then((output) => {
    config.formats.forEach((formatItem) => {
      output.files.forEach((file, index) => {
        const srcFilePath = path.join(config.srcPath, file);
        const readableStream = fs.createReadStream(srcFilePath);
        const desPath = path.join(config.desPath, formatItem.format);

        fileSystemHelper.mkDirByPathSync(desPath);

        if (formatItem.format === output.defaultExtension) {
          const desFilePath = path.join(desPath, file);

          readableStream.pipe(fs.createWriteStream(desFilePath));
        }

        if (formatItem.size && formatItem.size.length !== 0) {
          const maxSize = Math.max(...formatItem.size).toString();

          // convert and resize
          const desFolderPath = path.join(desPath, maxSize);
          const desFilePathMax = path.join(
            desFolderPath,
            `${output.fileNames[index]}.${formatItem.format}`,
          );

          fileSystemHelper.mkDirByPathSync(desFolderPath);

          const convertAndResizeStream = graphicsMagickHelper.convertAndResize(
            maxSize,
            formatItem.format,
            readableStream,
          );
          const writeStream = fs.createWriteStream(desFilePathMax);
          const writableStream = convertAndResizeStream.stream().pipe(writeStream);

          writableStream.on('finish', () => {
            // resize
            formatItem.size.forEach((itemSize) => {
              if (itemSize === maxSize) {
                return;
              }

              const desFolderPath = path.join(desPath, itemSize);
              const desFilePath = path.join(
                desFolderPath,
                `${output.fileNames[index]}.${formatItem.format}`,
              );
              const readableStream = fs.createReadStream(desFilePathMax);

              fileSystemHelper.mkDirByPathSync(desFolderPath);

              const resizeStream = graphicsMagickHelper.resize(
                itemSize,
                readableStream,
              );
              const writeStream = fs.createWriteStream(desFilePath);

              resizeStream.stream().pipe(writeStream);
            });
          });
        }
      });
    });
  })
  .catch();*/
