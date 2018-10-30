/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');

const config = require('../config');

const addToDirectory = (folder, zip) => {
  const prefix = folder.toLowerCase();
  const srcPath = path.join(config.desPath, prefix);

  zip.directory(srcPath, prefix);
};

const zip = (folders) => {
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

  folders.forEach((folder) => {
    addToDirectory(folder, zip);
  });

  zip.pipe(fs.createWriteStream(desFolderPath));
  zip.finalize();
};

module.exports = zip;
