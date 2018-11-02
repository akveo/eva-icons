/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

const path = require('path');

const config = require('./config');
const fileSystemHelper = require('./helpers/fs-helper');
const buildIconsJSON = require('./services/build-icons-json');
const buildSprite = require('./services/build-sprite');
const renameIcon = require('./services/rename-icon');
const mergeIconsJSON = require('./services/merge-icons-json');
const zip = require('./services/zip');
const buildWebFont = require('./services/build-web-font');

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
const copy = (folderPath) => {
  const pathFromCopy = path.join(config.srcPath, folderPath);
  const pathToCopy = path.join(config.desPath, folderPath.toLowerCase());

  return fileSystemHelper.copy(pathFromCopy, pathToCopy);
};
const prepareIcons = (iconType) => {
  const folderPath = path.join(config.srcPath, iconType);
  const srcPath = path.join(folderPath, config.defaultExtension);

  return fileSystemHelper.getSourceFiles(srcPath)
    .then((sourceFiles) => {
      return buildIconsJSON(sourceFiles.files, srcPath, iconType)
        .then(() => buildSprite(iconType));
    });
};
const merge = () => {
  return fileSystemHelper.getSourceFiles(config.desPath)
    .then(sourceFiles => {
      return mergeIconsJSON(sourceFiles.files)
        .then(() => buildSprite('eva'));
    });
};
const renameIcons = (type, folderPath, extension) => {
  const srcPath = path.resolve(config.srcPath, folderPath);

  return fileSystemHelper.getSourceFiles(srcPath)
    .then((sourceFiles) => renameIcon(sourceFiles.files, srcPath, type, extension));
};

fileSystemHelper.remove(config.desPath)
  .then(() => {
    return fileSystemHelper.getSourceFiles(config.srcPath)
      .then((srcDirectories) => {
        return Promise.all(srcDirectories.files.map((iconType) => {
          return Promise.all([
            renameIcons(iconType, `${iconType}/${config.defaultExtension}`, config.defaultExtension),
            renameIcons(iconType, `${iconType}/png/128`, 'png')
          ])
            .then(() => {
              return Promise.all([
                copy(`${iconType}/${config.defaultExtension}`),
                copy(`${iconType}/png/128`),
              ]);
            })
            .then(() => prepareIcons(iconType));
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
