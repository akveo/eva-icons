/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

const fs = require('fs-extra');
const globby = require('globby');
const path = require('path');

const config = require('../config');
const fileSystemHelper = require('../helpers/fs-helper');
const optimizeSvg = require('./oprimize-svg');

const prepareSVGsForFonts = () => {
  const srcPath = path.resolve(config.desPath, '**/svg/*.svg');
  const destPath = path.join(config.desPath, '/style/icons/svg');

  fileSystemHelper.mkDirByPathSync(destPath);

  return globby([srcPath])
    .then(foundFiles => {
      return Promise.all(foundFiles.map((svgFile) => {
        const filesName = path.basename(svgFile);
        const desSvgPath = path.join(destPath, filesName);
        const svg = fs.readFileSync(svgFile);

        return optimizeSvg(svg)
          .then((processedSvg) => {
            fs.writeFileSync(desSvgPath, processedSvg);
          });
      }));
    });
};

module.exports = prepareSVGsForFonts;
