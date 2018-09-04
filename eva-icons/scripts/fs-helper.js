const fs = require('fs');
const path = require('path');

class FileSystemHelper {

  deleteFiles(desPath, removeFolder) {
    if( fs.existsSync(desPath) ) {
      fs.readdirSync(desPath).forEach((file) => {
        const currentPath = path.join(desPath, file);

        if(fs.lstatSync(currentPath).isDirectory()) {
          this.deleteFiles(currentPath, true);
        } else {
          fs.unlinkSync(currentPath);
        }
      });
      if (removeFolder) {
        fs.rmdirSync(desPath);
      }
    }
  }

  getSourceFiles(srcPath, extention) {
    return new Promise((resolve, reject) => {
      fs.readdir(srcPath, (err, files) => {
        if (err) {
          reject(err);
        }

        const output = {
          files,
          defaultExtension: extention,
          fileNames: files.map((file) => this.trimFileExtension(file))
        };

        resolve(output);
      })
    });
  }

  mkDirByPathSync(
    targetDir,
    {
      isRelativeToScript = false,
    } = {}) {
    const sep = path.sep;
    const initDir = path.isAbsolute(targetDir) ? sep : '';
    const baseDir = isRelativeToScript ? __dirname : '.';

    return targetDir.split(sep).reduce((parentDir, childDir) => {
      const currentDir = path.resolve(baseDir, parentDir, childDir);
      try {
        fs.mkdirSync(currentDir);
      } catch (err) {
        if (err.code === 'EEXIST') { // currentDir already exists!
          return currentDir;
        }

        // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
        if (err.code === 'ENOENT') { // Throw the original parentDir error on currentDir `ENOENT` failure.
          throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
        }

        const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
        if (!caughtErr || caughtErr && targetDir === currentDir) {
          throw err; // Throw if it's just the last created dir.
        }
      }

      return currentDir;
    }, initDir);
  }

  getExtension(fileName) {
    return fileName
      .slice((Math.max(0, fileName.lastIndexOf('.')) || Infinity) + 1);
  }

  trimFileExtension(fileName) {
    return fileName.replace(/\.[^/.]+$/, '');
  }
}

module.exports = FileSystemHelper;
