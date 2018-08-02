const path = require('path');

const CutterService = require('../services/cutter');
const ZipperService = require('../services/zipper');
const stringBuilder = require('../services/string-builder');
const fileManager = require('../services/file-manager');

// TODO: improve error system

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
        if (!emojiName || stringBuilder.testEmojiName(req.query.name.toLowerCase()))
            res.status(500).send('invalid emoji name');

        // get and save file
        console.log('POST /emoji');
        console.log('saving image in storage');
        let imageFile = req.files.upfile;
        emojiName = emojiName.toLowerCase() + '.' + stringBuilder.getExtension(imageFile.name);

        try {
            await fileManager.moveFile(imageFile, path.join(__dirname, '../image-in'), emojiName);
        } catch (err) {
            console.log('error while saving file, sending status 500');
            res.status(500).send(err);
        }

        // call cutting service
        console.log('calling cutting service to cut the image');
        let rowCols = [];
        try {
            rowsCols = await CutterService.cutImage(emojiName);
        } catch (err) {
            console.log('error while cutting the image');
            res.status(500).send(err);
        }


        // build emoji string
        console.log('calling string builder service to get emoji string');
        let emojiString = stringBuilder.buildEmojiString(rowsCols[0], rowsCols[1], emojiName);

        // zip image
        console.log('calling zipper service to zip the emojis together');
        await ZipperService.zipImage(emojiName).catch((err) => {
            console.log('error while zipping the large emoji');
            res.status(500).send(err);
        });

        // delete image-in and image-out
        console.log('deleting image-in and image-out files');
        try {
            await fileManager.removeFile(path.join(__dirname, '../image-in'), emojiName);
            await fileManager.removeDirectory(path.join(__dirname, `../image-out/${emojiName}`));
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }

        // send back response
        console.log('cutter completed successfully, sending back file name');
        res.status(200).send({
            fileName: emojiName,
            emojiString: emojiString,
        });
    });

    /**
     * GET /emoji/:name
     * get download link for a large emoji based on its name
     */
    router.get('/emoji/:name', (req, res) => {
        console.log('GET /emoji/:name');
        const fileName = req.params.name;
        const fileLocation = path.join(__dirname, `../zip-out/${fileName}.zip`);
        res.download(fileLocation);
    });
};
