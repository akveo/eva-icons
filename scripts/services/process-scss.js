/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

const path = require('path');
const fs = require('fs-extra');

const config = require('../config');
const fileSystemHelper = require('../helpers/fs-helper');

const genScssRoot = (scssRoot) => {
  const buildScss = './eva-icons.scss';
  const rootFileContent = `
@import 'eva-icons-variables';
@import 'eva-icons-font';
`;

  return new Promise((resolve, reject) => {
    fs.writeFile(
      path.join(scssRoot, buildScss),
      rootFileContent,
      'utf8',
      (error) => {
        if (error) {
          reject(error);
        }

        resolve();
      },
    );
  });
};

const genScssVariables = (scssRoot) => {
  const buildScss = './_eva-icons-variables.scss';
  const variablesContent = `
$eva-icons-font-path: '../fonts' !default;
$eva-icons-font-family: 'Eva-Icons' !default;
`;

  return new Promise((resolve, reject) => {
    fs.writeFile(
      path.join(scssRoot, buildScss),
      variablesContent,
      'utf8',
      (error) => {
        if (error) {
          reject(error);
        }

        resolve();
      },
    );
  });
};

const genScssFont = (scssRoot) => {
  const buildScss = './_eva-icons-font.scss';
  const buildCss = path.join(config.desPath, 'style/eva-icons.css');
  const file = fs.readFileSync(buildCss).toString();
  const content = file
    .replace(/"/g, '\'')
    .replace(/\.\/fonts/g, '#{$eva-icons-font-path}')
    .replace(/(font-family: )(.*)(;)/g, '$1#{$eva-icons-font-family}$3');

  return new Promise((resolve, reject) => {
    fs.writeFile(
      path.join(scssRoot, buildScss),
      content,
      (error) => {
        if (error) {
          reject(error);
        }

        resolve();
      },
    );
  });
};

const processScss = () => {
  const scssRoot = path.join(config.desPath, '/style/scss');

  fileSystemHelper.mkDirByPathSync(scssRoot);

  return Promise.all([
    genScssRoot(scssRoot),
    genScssVariables(scssRoot),
    genScssFont(scssRoot),
  ]);
};

module.exports = processScss;
