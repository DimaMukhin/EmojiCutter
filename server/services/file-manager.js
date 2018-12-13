// file manager helper module
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');

const ServerError = require('../models/ServerError');

const fileManager = {};

fileManager.moveFile = async (file, dir, newFileName) => {
  const err = await file.mv(path.join(path.join(dir, newFileName)));
  if (err) throw err;
};

fileManager.removeFile = (dir, fileName) =>
  new Promise((resolve, reject) => {
    fs.unlink(path.join(dir, fileName), err => {
      if (err) {
        reject(
          new ServerError(
            7,
            'Internal Server Error, could not remove file from disk',
            err
          )
        );
      }
      resolve();
    });
  });

fileManager.removeDirectory = dir =>
  new Promise((resolve, reject) => {
    rimraf(dir, err => {
      if (err) {
        reject(
          new ServerError(
            8,
            'Internal Server Error, could not remove directory from disk',
            err
          )
        );
      }
      resolve();
    });
  });

fileManager.cleanEmojiFiles = async emojiName => {
  try {
    await fileManager.removeFile(
      path.join(__dirname, '../image-in'),
      emojiName
    );
    await fileManager.removeDirectory(
      path.join(__dirname, `../image-out/${emojiName}`)
    );
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = fileManager;
