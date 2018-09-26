const fs = require('fs-extra');
const path = require('path');

const processSvg = require('./process-svg');

const processSvgs = (svgFiles, srcPath) => {
  return Promise.all(svgFiles.map((svgFile) => {
    const svgPath = path.join(srcPath, svgFile);
    const svg = fs.readFileSync(svgPath);

    return processSvg(svg)
      .then((processedSvg) => {
        fs.writeFileSync(svgPath, processedSvg);
      });
  }));
};

module.exports = processSvgs;
