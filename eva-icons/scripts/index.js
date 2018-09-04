const fs = require('fs');
const path = require('path');

const config = require('./config.json');
const FileSystemHelper = require('./fs-helper');
const GraphicsMagickHelper = require('./gm-helper');

const fileSystemHelper = new FileSystemHelper();
const graphicsMagickHelper = new GraphicsMagickHelper();

// delete all files in destination folder
fileSystemHelper.deleteFiles(config.desPath);

//
fileSystemHelper.getSourceFiles(config.srcPath, 'svg')
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
          formatItem.size.forEach((itemSize) => {
            const desFolderPath = path.join(desPath, itemSize);
            const desFilePath = path.join(
              desFolderPath,
              `${output.fileNames[index]}.${formatItem.format}`,
            );

            fileSystemHelper.mkDirByPathSync(desFolderPath);

            const stream = graphicsMagickHelper.convertAndResize(
              itemSize,
              formatItem.format,
              readableStream,
            );

            stream.stream(function (err, stdout) {
              if (err) {
                throw err;
              }

              const writeStream = fs.createWriteStream(desFilePath);

              stdout.pipe(writeStream);
            });
          });
        }
      });
    });
  })
  .catch();
