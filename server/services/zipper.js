const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

const zipper = {};

/**
 * zip a group of emojis by the name of the emoji
 * all emojis should be in /image-in/<emoji-name/
 * @param {string} imageName the name of the large emoji to zip
 */
zipper.zipImage = (imageName) => {
    return new Promise((resolve, reject) => {
        console.log('creating writing stream');
        const output = fs.createWriteStream(path.join(__dirname, `../zip-out/${imageName}.zip`));
        let archive = archiver('zip');

        output.on('close', function () {
            console.log(archive.pointer() + ' total bytes');
            console.log('archiver has been finalized and the output file descriptor has closed.');
            resolve();
        });

        archive.on('error', function (err) {
            console.log('error while zipping', err);
            reject();
            throw err;
        });

        archive.pipe(output);

        archive.directory(path.join(__dirname, `../image-out/${imageName}`), false);

        archive.finalize();
    });

}

module.exports = zipper;