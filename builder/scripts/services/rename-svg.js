const fs = require('fs-extra');
const path = require('path');

const config = require('../config');

const renameSvg = (files, srcPath, folder) => {
  const folderName = folder.toLowerCase();

  return Promise.all(files.map((svgFile) => {
    const postfix = 'outline';
    const isOutline = folderName === postfix;
    const shouldRename = isOutline && svgFile.indexOf(postfix) === -1;

    if (shouldRename) {
      const disExtension = config.defaultExtension;
      const disFileName = `${path.basename(svgFile, `.${disExtension}`)}-${postfix}.${disExtension}`;

      fs.renameSync(path.resolve(srcPath, svgFile), path.resolve(srcPath, disFileName));

      return disFileName;
    }

    return svgFile;
  }));
};

module.exports = renameSvg;
