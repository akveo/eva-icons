const fs = require('fs');
const path = require('path');

class FileSystemHelper {

  deleteFiles(srcPath, removeFolder) {
    const deleteFilesRecursively = (fileOrFolderPath, shouldRemove) => {
      if(fs.existsSync(fileOrFolderPath)) {
        fs.readdirSync(fileOrFolderPath).forEach((file) => {
          const currentPath = path.join(fileOrFolderPath, file);

          if(fs.lstatSync(currentPath).isDirectory()) {
            deleteFilesRecursively(currentPath, true);
          } else {
            fs.unlinkSync(currentPath);
          }
        });

        if (shouldRemove) {
          fs.rmdirSync(fileOrFolderPath);
        }
      }
    };

    return new Promise((resolve, reject) => {
      deleteFilesRecursively(srcPath, removeFolder);

      if (removeFolder) {
        if (fs.existsSync(srcPath)) {
          reject({
            message: 'The folder was not deleted'
          });
        } else {
          resolve();
        }
      } else {
        if (fs.readdirSync(srcPath).length === 0) {
          resolve();
        } else {
          reject({
            message: 'The folder not empty'
          });
        }
      }
    });
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
    { isRelativeToScript = false } = {})
  {
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

  copy(srcPath, destPath) {

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
