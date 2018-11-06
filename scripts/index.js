/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

const path = require('path');

const config = require('./config');
const fileSystemHelper = require('./helpers/fs-helper');
const processSvgs = require('./services/process-svgs');
const processPngs = require('./services/process-pngs');
const buildIconsJSON = require('./services/build-icons-json');
const buildSprite = require('./services/build-sprite');
const renameIcons = require('./services/rename-icon');
const mergeIconsJSON = require('./services/merge-icons-json');
const zip = require('./services/zip');
const buildWebFont = require('./services/build-web-font');

const renameSrcIcons = (srcPath, srcIcons, postfix, extension) => {
  if (postfix.toLowerCase() === 'outline') {
    return renameIcons(srcPath, srcIcons, postfix, extension);
  }

  return Promise.resolve(srcIcons);
};
const prepareSvgIcons = (icons, srcPath, desPath) => {
  const desSvgPath = path.join(desPath, 'svg');

  return processSvgs(icons, srcPath, desSvgPath);
};
const preparePngIcons = (icons, srcPath, desPath) => {
  const desPngPath = path.join(desPath, 'png');

  return processPngs(icons, srcPath, desPngPath);
};
const merge = () => {
  return fileSystemHelper.getFilesByPath(config.desPath)
    .then(sourceFiles => {
      return mergeIconsJSON(sourceFiles.files)
        .then(() => buildSprite('eva'));
    });
};
const copyPackageJson = () => {
  const fileName = 'package.json';
  const srcPath = path.join(__dirname, fileName);
  const desPath = path.join(config.desPath, fileName);

  return fileSystemHelper.copy(srcPath, desPath);
};
const copyReadme = () => {
  const fileName = 'README.md';
  const srcPath = path.join(__dirname, '..', fileName);
  const desPath = path.join(config.desPath, fileName);

  return fileSystemHelper.copy(srcPath, desPath);
};

fileSystemHelper.remove(config.desPath)
  .then(() => {
    return fileSystemHelper.getFilesByPath(config.srcPath)
      .then((srcDirectories) => {
        const srcFolders = srcDirectories.files;

        return Promise.all(srcFolders.map((folder) => {
          const srcIconsPath = path.join(config.srcPath, folder, config.defaultExtension);
          const desIconsPath = path.join(config.desPath, folder);

          return fileSystemHelper.getFilesByPath(srcIconsPath)
            .then((sourceIcons) => {
              return renameSrcIcons(srcIconsPath, sourceIcons.files, folder, 'svg')
                .then((renamedFiles) => Promise.all([
                  prepareSvgIcons(renamedFiles, srcIconsPath, desIconsPath),
                  preparePngIcons(renamedFiles, srcIconsPath, desIconsPath),
                ])
                  .then(() => buildIconsJSON(renamedFiles, path.join(desIconsPath, 'svg'), folder))
                  .then(() => buildSprite(folder))
                );
            });
          }))
          .then(() => merge())
          .then(() => {
            const archivePath = path.join(config.srcPath, '../archive');

            zip(srcDirectories.files, archivePath);
          });
      })
  })
  .then(() => buildWebFont())
  .then(() => copyPackageJson())
  .then(() => copyReadme())
  .catch((error) => {
    const errorMessage = error && error.message ? error.message : `${error}, Smth went wrong`;

    console.error(errorMessage);
  });
