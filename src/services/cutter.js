const Jimp = require('jimp');

const cutter = {};
const iconSize = 128;

cutter.cutImage = (imageName) => {
    Jimp.read(`./src/image-in/${imageName}`).then((image) => {
        let imgWidth = image.bitmap.width;
        let imgHeight = image.bitmap.height;

        for (let row = 0; row * iconSize <= imgHeight - iconSize; row++) {
            for (let col = 0; col * iconSize <= imgWidth - iconSize; col++) {
                image.clone()
                    .crop(row * iconSize, col * iconSize, iconSize, iconSize)
                    .write(`./src/image-out/${row}-${col}-${imageName}`);
            }
        }
    }).catch((err) => {
        console.log(err);
    });
}

module.exports = cutter;