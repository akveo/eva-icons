/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

const fs = require('fs-extra');

const fileSystemHelper = {
  remove(srcPath) {
    return fs.remove(srcPath);
  },

  getFilesByPath(srcPath) {
    return new Promise((resolve, reject) => {
      fs.readdir(srcPath, (err, files) => {
        if (err) {
          reject(err);
        }


        const output = {
          files,
          fileNames: files.map((file) => this.trimFileExtension(file))
        };

        resolve(output);
      })
    });
  },

  mkDirByPathSync(targetDir) {
    if (fs.pathExistsSync(targetDir)) {
      return;
    }

    return fs.mkdirsSync(targetDir);
  },

  copy(srcPath, desPath) {
    if (fs.pathExistsSync(srcPath)) {
      return fs.copy(srcPath, desPath);
    }

    return Promise.resolve();
  },

  isFolder(path) {
    return fs.lstatSync(path).isDirectory();
  },

  getExtension(fileName) {
    return fileName
      .slice((Math.max(0, fileName.lastIndexOf('.')) || Infinity) + 1);
  },

  trimFileExtension(fileName) {
    return fileName.replace(/\.[^/.]+$/, '');
  },
};

module.exports = fileSystemHelper;
