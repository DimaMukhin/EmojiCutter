// string builder helper module

const stringBuilder = {};

/**
 * Build a slack large emoji string to copy paste
 * @param {int} rows the amount of rows of emojis
 * @param {int} cols the amount of columns of emojis
 * @param {string} imageName the name of the emoji
 */
stringBuilder.buildEmojiString = (rows, cols, imageName) => {
    let resString = '';

    imageName = stringBuilder.stripExtension(imageName);

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            resString += `:${row}-${col}-${imageName}:`
        }
        resString += '\n';
    }

    return resString;
}

/**
 * Strip extenssion off of a file name
 * Basically return the name of the file up until the first period
 * @param {string} fileName the name of the file to strip
 */
stringBuilder.stripExtension = (fileName) => {
    return fileName.substring(0, fileName.indexOf('.'));
}

/**
 * get the extension of a file
 * example, return .png for filename.png
 * @param {string} fileName 
 */
stringBuilder.getExtension = (fileName) => {
    return fileName.split('.').pop();
}

/**
 * test if emoji name is valid
 * emoji names should only consist of:
 *  - lower case letters
 *  - numbers
 *  - dashes ("-")
 * @param {string} emojiName 
 */
stringBuilder.testEmojiName = (emojiName) => {
    return RegExp('/^[0-9a-z\-]+$/').test(emojiName);
}

module.exports = stringBuilder;