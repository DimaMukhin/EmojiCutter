const Jimp = require('jimp');
const path = require('path');

const cutter = {};
const iconSize = 128;

cutter.cutImage = (imageName) => {
    return new Promise((resolve, reject) => {
        console.log('reading image to cut');
        Jimp.read(path.join(__dirname, `../image-in/${imageName}`)).then((image) => {
            if (!image) {
                console.log('image format not supported');
                reject();
                return;
            }

            console.log('image was read successfully');
            let imgWidth = image.bitmap.width;
            let imgHeight = image.bitmap.height;

            for (let row = 0; row * iconSize < imgHeight; row++) {
                for (let col = 0; col * iconSize < imgWidth; col++) {
                    image.clone()
                        .crop(col * iconSize, row * iconSize, iconSize, iconSize)
                        .write(path.join(__dirname, `../image-out/${imageName}/${row}-${col}-${imageName}`), (err) => {
                            if (err) {
                                console.log('failed writing emoji piece to disk');
                                reject(err);
                                return;
                            }

                            console.log('emoji writing (row, col):', row, col);
                            if (((row + 1) * iconSize) >= imgHeight && ((col + 1) * iconSize) >= imgWidth) {
                                resolve([imgHeight / iconSize, imgWidth / iconSize]);
                                return;
                            }
                        });
                }
            }
        }).catch((err) => {
            console.log('could not read image', err);
            reject(err);
        });
    });
}

module.exports = cutter;