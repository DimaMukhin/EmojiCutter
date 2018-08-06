const path = require('path');

const CutterService = require('../services/cutter');
const ZipperService = require('../services/zipper');
const stringBuilder = require('../services/string-builder');
const fileManager = require('../services/file-manager');
const ServerError = require('../models/ServerError');

module.exports = (router) => {
    /**
     * POST /emoji 
     * requires a file in req.files names "upfile"
     * moves image to /image-in
     * cuts down an image into emoji pieces and places them in /image-out/<image name>
     * zips all the pieces together and places the zip filder in /zip-out
     */
    router.post('/emoji', async (req, res) => {
        let emojiName = req.query.name;
        if (!emojiName || stringBuilder.testEmojiName(req.query.name.toLowerCase())) {
            console.log('invalid emoji name, terminating..');
            res.status(400).send(new ServerError(1, 'invalid emoji name'));
            return;
        }

        // get and save file
        console.log('POST /emoji');
        console.log('saving image in storage');
        let imageFile = req.files.upfile;
        if (!imageFile) { 
            console.log('no file found, terminating..');
            res.status(400).send(new ServerError(2, 'no file found'));
            return;
        }

        if (imageFile.truncated) { 
            console.log('max file size exceeded, terminating..');
            res.status(400).send(new ServerError(10, 'max file size exceeded'));
            return;
        }
        
        emojiName = emojiName.toLowerCase() + '.' + stringBuilder.getExtension(imageFile.name);

        try {
            await fileManager.moveFile(imageFile, path.join(__dirname, '../image-in'), emojiName);
        } catch (err) {
            console.log('error while saving file, sending status 500, terminating...');
            fileManager.cleanEmojiFiles(emojiName);
            res.status(500).send(new ServerError(3, 'Internal Server Error, cannot save file'));
            return;
        }

        // call cutting service
        console.log('calling cutting service to cut the image');
        let rowsCols = [];
        try {
            rowsCols = await CutterService.cutImage(emojiName);
        } catch (err) {
            console.log('error while cutting the image, terminating...');
            fileManager.cleanEmojiFiles(emojiName);
            res.status(500).send(err);
            return
        }

        // build emoji string
        console.log('calling string builder service to get emoji string');
        let emojiString = stringBuilder.buildEmojiString(rowsCols[0], rowsCols[1], emojiName);

        // zip image
        console.log('calling zipper service to zip the emojis together');
        try {
            await ZipperService.zipImage(emojiName);
        } catch (err) {
            console.log('error while zipping emoji, terminating...');
            fileManager.cleanEmojiFiles(emojiName);
            res.status(500).send(err);
            return;
        }

        // delete image-in and image-out
        fileManager.cleanEmojiFiles(emojiName);

        // send back response
        console.log('cutter completed successfully, sending back file name');
        res.status(200).send({
            fileName: emojiName,
            emojiString: emojiString,
        });
    });
};
