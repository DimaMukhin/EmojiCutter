const Jimp = require('jimp');
const path = require('path');

const ServerError = require('../models/ServerError');

const cutter = {};
const ICON_SIZE = 128;

/**
 * Cut an image into emoji size pieces
 * image size is ICON_SIZE * ICON_SIZE
 * image should be in image-in with the name <imageName>
 * @param {string} imageName the name of the image to cut
 */
cutter.cutImage = async (imageName) => {
    console.log('reading image to cut');
    try {
        console.log('image was read successfully');
        let image = await cutter.readImageFromStorage(imageName);
        let imgWidth = image.bitmap.width;
        let imgHeight = image.bitmap.height;

        let emojiPiecesCuttingPromisses = [];
        for (let row = 0; row * ICON_SIZE < imgHeight; row++) {
            for (let col = 0; col * ICON_SIZE < imgWidth; col++) {
                emojiPiecesCuttingPromisses.push(cutter.cutEmojiPieceFromImage(image, row, col, imageName));
            }
        }

        await Promise.all(emojiPiecesCuttingPromisses);
        return [imgHeight / ICON_SIZE, imgWidth / ICON_SIZE];
    } catch (err) {
        console.log('failed while cutting/reading image from storage', err);
        if (err instanceof ServerError)
            return err;
        else
            return new ServerError(5, 'Internal Server Error, could not read file', err);
    }
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
            return Promise.reject(new ServerError(4, 'file format not supported'));
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
                    reject(new ServerError(6, 'Internal Server Erorr, failed to write emoji piece to disk', err));
                    return;
                }
                console.log('emoji writing (row, col):', row, col);
                resolve();
            });
    });
}

module.exports = cutter;
