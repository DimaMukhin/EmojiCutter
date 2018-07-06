// string builder helper module

const stringBuilder = {};

stringBuilder.buildEmojiString = (rows, cols, imageName) => {
    let resString = '';

    imageName = stringBuilder.stripExtension(imageName);

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            resString += `:${row}-${col}-${imageName}:`
        }
        // resString += '\n';
    }

    return resString;
}

stringBuilder.stripExtension = (fileName) => {
    return fileName.substring(0, fileName.indexOf('.'));
}

module.exports = stringBuilder;