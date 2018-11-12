/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');

const config = require('../config');

const addToDirectory = (srcPath, subDir, zip) => {
  zip.directory(srcPath, subDir);
};

const zip = (iconsFolders, archivePath) => {
  const zip = archiver('zip', { zlib: { level: 9 } });
  const desFolderPath = path.join(config.desPath, `eva-icons.zip`);

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

  iconsFolders.forEach((folder) => {
    const prefix  = folder.toLowerCase();
    const srcPath = path.join(config.desPath, prefix);

    addToDirectory(srcPath, prefix, zip);
  });

  addToDirectory(archivePath, false, zip);

  zip.pipe(fs.createWriteStream(desFolderPath));

  console.info(`Build ${desFolderPath}`);

  zip.finalize();
};

module.exports = zip;
