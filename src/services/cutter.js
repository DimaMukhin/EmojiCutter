const Jimp = require('jimp');

const cutter = {};
const iconSize = 128;

cutter.cutImage = (imageName) => {
    return new Promise((resolve, reject) => {
        Jimp.read(`./src/image-in/${imageName}`).then((image) => {
            let imgWidth = image.bitmap.width;
            let imgHeight = image.bitmap.height;

            for (let row = 0; row * iconSize < imgHeight; row++) {
                for (let col = 0; col * iconSize < imgWidth; col++) {
                    // let widthCut = col * iconSize + iconSize <= imgWidth ? iconSize : imgWidth - col * iconSize;
                    // let hightCut = row * iconSize + iconSize <= imgHeight ? iconSize : imgHeight - row * iconSize;

                    image.clone()
                        .crop(col * iconSize, row * iconSize, iconSize, iconSize)
                        .write(`./src/image-out/${imageName}/${row}-${col}-${imageName}`, () => {
                            resolve([imgHeight / iconSize, imgWidth / iconSize]);
                        });
                }
            }
        }).catch((err) => {
            console.log(err);
            reject(err);
        });
    });
}

module.exports = cutter;