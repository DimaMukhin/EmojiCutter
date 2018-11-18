const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

const ServerError = require('../models/ServerError');

const zipper = {};

/**
 * zip a group of emojis by the name of the emoji
 * all emojis should be in /image-in/<emoji-name/
 * @param {string} imageName the name of the large emoji to zip
 */
zipper.zipImage = imageName => {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(
      path.join(__dirname, `../zip-out/${imageName}.zip`)
    );
    let archive = archiver('zip');

    output.on('close', function() {
      resolve();
    });

    archive.on('error', function(err) {
      reject(
        new ServerError(
          9,
          'Internal Server Error, could not zip directory',
          err
        )
      );
      throw err;
    });

    archive.pipe(output);

    archive.directory(path.join(__dirname, `../image-out/${imageName}`), false);

    archive.finalize();
  });
};

module.exports = zipper;
