const Jimp = require('jimp');
const path = require('path');

const imageProcessor = {};
const ICON_SIZE = 128;

/**
 * read an image from storage by the image name
 * image should be in /image-in
 * @param {string} imageName the name of the image to read
 */
imageProcessor.readImageFromStorage = async imageName => {
  const image = await Jimp.read(
    path.join(__dirname, `../image-in/${imageName}`)
  );

  if (!image) {
    return Promise.reject(new ServerError(4, 'file format not supported'));
  }

  return image;
};

/**
 * Cut an emoji size piece from an image
 * Write the emoji into /image-out/<emoji-name>/<row>-<col>-<emoji-name>
 * cut the emoji at [row, col]
 * @param {Image}   image       the image to cut
 * @param {int}     col         the column to cut from
 * @param {int}     row         the row to cut from
 * @param {string}  imageName   the name of the emoji
 */
imageProcessor.cutEmojiPieceFromImage = (image, row, col, imageName) => {
  const imgWidth = image.bitmap.width;
  const imgHeight = image.bitmap.height;
  const resizedImgWidth = Math.round(imgWidth / ICON_SIZE) * ICON_SIZE;
  const resizedImgHeight = Math.round(imgHeight / ICON_SIZE) * ICON_SIZE;

  return new Promise((resolve, reject) => {
    image
      .clone()
      .resize(resizedImgWidth, resizedImgHeight)
      .crop(col * ICON_SIZE, row * ICON_SIZE, ICON_SIZE, ICON_SIZE)
      .write(
        path.join(
          __dirname,
          `../image-out/${imageName}/${row}-${col}-${imageName}`
        ),
        err => {
          if (err) {
            reject(
              new ServerError(
                6,
                'Internal Server Erorr, failed to write emoji piece to disk',
                err
              )
            );
            return;
          }
          resolve();
        }
      );
  });
};

module.exports = imageProcessor;
