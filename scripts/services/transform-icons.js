/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

const fs = require('fs-extra');
const path = require('path');

const graphicsMagickHelper = require('../helpers/gm-helper');
const fileSystemHelper = require('../helpers/fs-helper');

class TransformIcons {
  constructor(srcFile, srcFilePath, desPath, options) {
    this.srcFile = srcFile;
    this.srcFilePath = srcFilePath;
    this.readableStream = fs.createReadStream(srcFilePath);
    this.desPath = desPath;
    this.options = options;

    fileSystemHelper.mkDirByPathSync(desPath);
  }

  getAndMakeDesFolder(...desPath) {
    const desFolderPath = path.join(...desPath);

    fileSystemHelper.mkDirByPathSync(desFolderPath);

    return desFolderPath;
  }

  convert() {
    const desFileName = `${fileSystemHelper.trimFileExtension(this.srcFile)}.${this.options.convertTo}`;
    const desFilePath = path.join(this.desPath, desFileName);
    const writeStream = fs.createWriteStream(desFilePath);

    return graphicsMagickHelper.convert(
      this.options.convertTo,
      this.readableStream,
    ).stream().pipe(writeStream);
  }

  resize() {
    return this.options.sizes.map((size) => {
      const desFolderPath = this.getAndMakeDesFolder(this.desPath, size);
      const desFilePath = path.join(desFolderPath, this.srcFile);
      const writeStream = fs.createWriteStream(desFilePath);

      return graphicsMagickHelper.resize(
        size,
        this.readableStream
      ).stream().pipe(writeStream);
    });
  }
}

module.exports = TransformIcons;
