/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

const gm = require('gm').subClass({imageMagick: true});

const graphicsMagickHelper = {
  convertAndResize(size, format, srcPath) {
    return gm(srcPath)
      .resize(size, size)
      .setFormat(format);
  },

  convert(format, srcPath) {
    return gm(srcPath)
      .setFormat(format);
  },

  resize(size, srcPath) {
    return gm(srcPath)
      .resize(size, size);
  },

  convertSvgToPng(size, format, srcPath) {
    return gm(srcPath)
      .in('-size', `${size}x${size}`)
      .background('transparent')
      .setFormat(format);
  }
};

module.exports = graphicsMagickHelper;
