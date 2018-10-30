/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

const fs = require('fs-extra');
const path = require('path');
const lazyRequire = require('lazy-require');

const config = require('../config');
const buildSpriteString = require('./build-sprite-string');

const buildSprite = (folder) => {
  const prefix = folder.toLowerCase();
  const inFileName = `${prefix}-icons.json`;
  const outFileName = `${prefix}-sprite.svg`;
  const inFile = path.join(config.desPath, inFileName);
  const outFile = path.join(config.desPath, outFileName);

  return new Promise((resolve) => {
    lazyRequire.sync(inFile, (error, icons) => {
      console.log(`Building ${outFile}...`);

      fs.writeFileSync(outFile, buildSpriteString(icons));

      resolve();
    });
  });
};

module.exports = buildSprite;
