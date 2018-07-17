const Jimp = require('jimp');
const path = require('path');

const cutter = {};
const ICON_SIZE = 128;

/**
 * Cut an image into emoji size pieces
 * image size is ICON_SIZE * ICON_SIZE
 * image should be in image-in with the name <imageName>
 * @param {string} imageName the name of the image to cut
 */
cutter.cutImage = (imageName) => {
    return new Promise((resolve, reject) => {
        console.log('reading image to cut');
        cutter.readImageFromStorage(imageName).then(async (image) => {
            console.log('image was read successfully');
            let imgWidth = image.bitmap.width;
            let imgHeight = image.bitmap.height;

            for (let row = 0; row * ICON_SIZE < imgHeight; row++) {
                for (let col = 0; col * ICON_SIZE < imgWidth; col++) {
                    await cutter.cutEmojiPieceFromImage(image, row, col, imageName);

                    console.log('emoji writing (row, col):', row, col);
                    if (cutter.isLastEmojiPieceOfImage(row, col, imgWidth, imgHeight)) {
                        resolve([imgHeight / ICON_SIZE, imgWidth / ICON_SIZE]);
                        return;
                    }
                }
            }
        }).catch((err) => {
            console.log('could not read file', err);
            reject(err);
        });
    });
}

/**
 * read an image from storage by the image name
 * image should be in /image-in
 * @param {string} imageName the name of the image to cut
 */
cutter.readImageFromStorage = (imageName) => {
    return Jimp.read(path.join(__dirname, `../image-in/${imageName}`)).then((image) => {
        if (!image) {
            console.log('image format not supported');
            return Promise.reject();
        }

        return image;
    });
}

/**
 * Cut en emoji size piece from an image
 * Write the emoji into /image-out/<emoji-name>/<row>-<col>-<emoji-name>
 * cut the emoji at [row, col]
 * @param {Image} image the image to cut 
 * @param {int} col the column to cut from
 * @param {int} row the row to cut from
 * @param {string} imageName the name of the emoji
 */
cutter.cutEmojiPieceFromImage = (image, row, col, imageName) => {
    return new Promise((resolve, reject) => {
        image.clone()
            .crop(col * ICON_SIZE, row * ICON_SIZE, ICON_SIZE, ICON_SIZE)
            .write(path.join(__dirname, `../image-out/${imageName}/${row}-${col}-${imageName}`), (err) => {
                if (err) {
                    console.log('failed writing emoji piece to disk');
                    reject(err);
                    return;
                }
                resolve();
            });
    });
}

/**
 * is [row, col] the last emoji sized piece of an image?
 * last emoji piece is botom right
 * @param {int} row the row of the emoji 
 * @param {int} col the column of the emoji 
 * @param {int} imgWidth the width of the image 
 * @param {int} imgHeight the height of the image 
 */
cutter.isLastEmojiPieceOfImage = (row, col, imgWidth, imgHeight) => {
    if (((row + 1) * ICON_SIZE) >= imgHeight && ((col + 1) * ICON_SIZE) >= imgWidth) {
        return true;
    }
    return false;
}

module.exports = cutter;