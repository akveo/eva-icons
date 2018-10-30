/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

const webfont = require('webfont').default;
const path = require('path');
const fs = require('fs-extra');

const processScss = require('./process-scss');
const config = require('../config');
const fileSystemHelper = require('../helpers/fs-helper');

const webFontOptions = {
  files: path.resolve(config.srcPath, '**/*.svg'),
  fontName: 'Eva-Icons',
  template: 'css',
  templateFontName: 'Eva-Icons',
  templateClassName: 'eva',
  templateFontPath: './fonts'
};

const buildFont = () => {
  const dest = path.join(config.desPath, '/css/fonts');
  const destTemplate = path.join(config.desPath, '/css');

  fileSystemHelper.mkDirByPathSync(dest);

  return webfont(webFontOptions)
    .then((result) => {
      const { fontName, template } = result.config;

      return Promise.all(
        Object.keys(result).map(type => {
          if (
            type === 'config' ||
            type === 'usedBuildInTemplate' ||
            type === 'glyphsData'
          ) {
            return Promise.resolve();
          }

          const content = result[type];
          let file = null;

          if (type !== 'template') {
            file = path.resolve(dest, `${fontName}.${type}`);
          } else {
            file = path.resolve(destTemplate, `${fontName}.${template}`);
          }

          return fs.outputFile(file, content);
        }))
        .then(() => processScss());
    });
};

module.exports = buildFont;
