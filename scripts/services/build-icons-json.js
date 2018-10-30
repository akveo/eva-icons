/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

const fs = require('fs-extra');
const path = require('path');

const config = require('../config');
const buildIconsObject = require('./build-icons-object');

const getSvg = srcPath => svgFile => fs.readFileSync(path.join(srcPath, svgFile));

const buildIconsJSON = (srcIcons, srcPath, folder) => {
  const prefix = folder.toLowerCase();
  const outFileName = `${prefix}-icons.json`;
  const outFile = path.resolve(config.desPath, outFileName);

  return new Promise((resolve) => {
    const icons = buildIconsObject(srcIcons, getSvg(srcPath));

    console.log(`Building ${outFile}...`);

    fs.writeFileSync(outFile, JSON.stringify(icons));

    resolve();
  });
};

module.exports = buildIconsJSON;
