// file manager helper module
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');

const fileManager = {};

fileManager.moveFile = (file, dir, newFileName) => {
    return file.mv(path.join(path.join(dir, newFileName))).then((err) => {
        if (err) throw err;
    });
}

fileManager.removeFile = (dir, fileName) => {
    return new Promise((resolve, reject) => {
        fs.unlink(path.join(dir, fileName), (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}

fileManager.removeDirectory = (dir) => {
    return new Promise((resolve, reject) => {
        rimraf(dir, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}

module.exports = fileManager;
