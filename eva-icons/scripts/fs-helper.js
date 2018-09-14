const fs = require('fs-extra');
const path = require('path');

class FileSystemHelper {

  remove(srcPath, removeFolder) {
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

  getSourceFiles(srcPath) {
    return new Promise((resolve, reject) => {
      fs.readdir(srcPath, (err, files) => {
        if (err) {
          reject(err);
        }

        const output = {
          files,
          fileNames: files.map((file) => this.trimFileExtension(file))
        };

        resolve(output);
      })
    });
  }

  mkDirByPathSync(targetDir) {
    if (fs.pathExistsSync(targetDir)) {
      return;
    }

    return fs.mkdirsSync(targetDir);
  }

  copy(srcPath, desPath) {
    if (fs.pathExistsSync(srcPath)) {
      return fs.copy(srcPath, desPath);
    }

    return Promise.resolve();
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
