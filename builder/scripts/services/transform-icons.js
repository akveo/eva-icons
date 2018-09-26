const fs = require('fs-extra');
const path = require('path');

const graphicsMagickHelper = require('../helpers/gm-helper');
const fileSystemHelper = require('../helpers/fs-helper');
const config = require('../config');

const convert = () => {
  const { format, desFolderPath, desFilePath, readableStream } = options;

  fileSystemHelper.mkDirByPathSync(desFolderPath);

  const writeStream = fs.createWriteStream(desFilePath);

  return graphicsMagickHelper.convert(
    format,
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
const transformFiles = (sourceFiles, srcPath, folder) => {
  return Promise.all(config.convertOrResizeFormats.map((formatItem) => {
    sourceFiles.files.forEach((file, index) => {
      const srcFilePath = path.join(srcPath, file);
      const desPath = path.join(config.desPath, folder.toLowerCase(), formatItem.format);
      const outputFileName = `${sourceFiles.fileNames[index]}.${formatItem.format}`;
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
  }));
};

module.exports = transformFiles;
