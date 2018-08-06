const imageProcessor = require('../services/image-processor');
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
        let image = await imageProcessor.readImageFromStorage(imageName);
        console.log('image was read successfully');
        let imgWidth = image.bitmap.width;
        let imgHeight = image.bitmap.height;

        let emojiPiecesCuttingPromisses = [];
        for (let row = 0; row * ICON_SIZE < imgHeight; row++) {
            for (let col = 0; col * ICON_SIZE < imgWidth; col++) {
                emojiPiecesCuttingPromisses.push(imageProcessor.cutEmojiPieceFromImage(image, row, col, imageName));
            }
        }

        await Promise.all(emojiPiecesCuttingPromisses);
        return [imgHeight / ICON_SIZE, imgWidth / ICON_SIZE];
    } catch (err) {
        console.log('failed while cutting/reading image from storage', err);
        if (err instanceof ServerError)
            return Promise.reject(err);
        else
            return Promise.reject(new ServerError(5, 'Internal Server Error, could not read file', err));
    }
}

module.exports = cutter;
