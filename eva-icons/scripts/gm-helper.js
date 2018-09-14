const gm = require('gm').subClass({imageMagick: true});

class GraphicsMagickHelper {
  convertAndResize(seze, format, srcPath) {
    return gm(srcPath)
      .resize(seze, seze)
      .setFormat(format);
  }

  convert(format, srcPath) {
    return gm(srcPath)
      .setFormat(format);
  }

  resize(seze, srcPath) {
    return gm(srcPath)
      .resize(seze, seze);
  }
}

module.exports = GraphicsMagickHelper;
