const fs = require('fs');
const archiver = require('archiver');

const zipper = {};

zipper.zipImage = (imageName) => {
    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(`./src/zip-out/${imageName}.zip`);
        let archive = archiver('zip');

        output.on('close', function () {
            console.log(archive.pointer() + ' total bytes');
            console.log('archiver has been finalized and the output file descriptor has closed.');
            resolve();
        });

        archive.on('error', function (err) {
            throw err;
            reject();
        });

        archive.pipe(output);

        archive.directory(`./src/image-out/${imageName}`, false);

        archive.finalize();
    });

}

module.exports = zipper;