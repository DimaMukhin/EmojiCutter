const Jimp = require('jimp');
const path = require('path');

const cutter = {};
const iconSize = 128;

cutter.cutImage = (imageName) => {
    return new Promise((resolve, reject) => {
        console.log('reading image to cut');
        Jimp.read(path.join(__dirname, `../image-in/${imageName}`)).then((image) => {
            console.log('image was read successfully');
            let imgWidth = image.bitmap.width;
            let imgHeight = image.bitmap.height;

            for (let row = 0; row * iconSize < imgHeight; row++) {
                for (let col = 0; col * iconSize < imgWidth; col++) {
                    // let widthCut = col * iconSize + iconSize <= imgWidth ? iconSize : imgWidth - col * iconSize;
                    // let hightCut = row * iconSize + iconSize <= imgHeight ? iconSize : imgHeight - row * iconSize;

                    image.clone()
                        .crop(col * iconSize, row * iconSize, iconSize, iconSize)
                        .write(path.join(__dirname, `../image-out/${imageName}/${row}-${col}-${imageName}`), () => {
                            console.log('emoji writing (row, col):', row, col);
                            resolve([imgHeight / iconSize, imgWidth / iconSize]);
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