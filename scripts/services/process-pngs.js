/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

const path = require('path');

const config = require('../config');
const TransformPngIcons = require('./transform-png-icons');

const processPngs = (srcFiles, srcPath, desPath) => {
  return Promise.all(srcFiles.map((srcFile) => {
    const srcFilePath = path.join(srcPath, srcFile);
    const fileTransformOptions = {
      convertTo: 'png',
      ...config.convertOptions.png,
    };
    const transformPng = new TransformPngIcons(srcFile, srcFilePath, desPath, fileTransformOptions);

    transformPng.convertAndResizeSvgToPng();
  }));
};

module.exports = processPngs;
