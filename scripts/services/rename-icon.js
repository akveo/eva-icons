/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

const fs = require('fs-extra');
const path = require('path');

const renameIcon = (files, srcPath, type, extension) => {
  const folderName = type.toLowerCase();

  return Promise.all(files.map((svgFile) => {
    const postfix = 'outline';
    const isOutline = folderName === postfix;
    const shouldRename = isOutline && svgFile.indexOf(postfix) === -1;

    if (shouldRename) {
      const disExtension = extension;
      const disFileName = `${path.basename(svgFile, `.${disExtension}`)}-${postfix}.${disExtension}`;

      fs.renameSync(path.resolve(srcPath, svgFile), path.resolve(srcPath, disFileName));

      return disFileName;
    }

    return svgFile;
  }));
};

module.exports = renameIcon;
