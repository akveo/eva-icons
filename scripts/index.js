/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

const path = require('path');

const config = require('./config');
const fileSystemHelper = require('./helpers/fs-helper');
const processSvgs = require('./services/process-svgs');
const buildIconsJSON = require('./services/build-icons-json');
const buildSprite = require('./services/build-sprite');
const renameSvg = require('./services/rename-svg');
const mergeIconsJSON = require('./services/merge-icons-json');
const transformFiles = require('./services/transform-icons');
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
const copy = (srcPath, folder) => {
  return Promise.all(config.copy.map((copyFormat) => {
    const pathFromCopy = path.join(srcPath, copyFormat.format);
    const pathToCopy = path.join(config.desPath, folder.toLowerCase(), copyFormat.format);

    return fileSystemHelper.copy(pathFromCopy, pathToCopy);
  }));
};
const prepareIcons = (folder) => {
  const folderPath = path.join(config.srcPath, folder);
  const srcPath = path.join(folderPath, config.defaultExtension);

  return fileSystemHelper.getSourceFiles(srcPath)
    .then((sourceFiles) => {
      return processSvgs(sourceFiles.files, srcPath, folder)
        .then(() => Promise.all([
          copy(folderPath, folder),
          transformFiles(sourceFiles, srcPath, folder),
          buildIconsJSON(sourceFiles.files, srcPath, folder),
        ]))
        .then(() => buildSprite(folder));
    });
};
const merge = () => {
  return fileSystemHelper.getSourceFiles(config.desPath)
    .then(sourceFiles => {
      return mergeIconsJSON(sourceFiles.files)
        .then(() => buildSprite('eva'));
    });
};
const renameSvgIcons = (folder) => {
  const folderPath = path.resolve(config.srcPath, folder);
  const srcPath = path.resolve(folderPath, config.defaultExtension);

  return fileSystemHelper.getSourceFiles(srcPath)
    .then((sourceFiles) => renameSvg(sourceFiles.files, srcPath, folder));
};

fileSystemHelper.remove(config.desPath)
  .then(() => {
    return fileSystemHelper.getSourceFiles(config.srcPath)
      .then((srcDirectories) => {
        return Promise.all(srcDirectories.files.map((folder) => {
          return renameSvgIcons(folder)
            .then(() => prepareIcons(folder));
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
