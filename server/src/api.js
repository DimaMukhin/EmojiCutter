const express = require('express');
const fs = require('fs');
const rimraf = require('rimraf');
const path = require('path');

const CutterService = require('./services/cutter');
const ZipperService = require('./services/zipper');
const stringBuilder = require('./services/string-builder');

const router = express.Router();

/**
 * API Health status
 */
router.get('/', (req, res) => {
    res.status(200).send('ok');
});

router.post('/emoji', async (req, res) => {
    // get and save file
    console.log('POST /emoji');
    console.log('saving image in storage');
    let imageFile = req.files.upfile;
    imageFile.mv(path.join(__dirname, `./image-in/${imageFile.name}`)).then((err) => {
        if (err) {
            console.log('error while saving file, sending status 500');
            res.status(500).send(err);
        }
    });

    // call cutting service
    console.log('calling cutting service to cut the image');
    let rowsCols = await CutterService.cutImage(imageFile.name);

    // build emoji string
    console.log('calling string builder service to get emoji string');
    let emojiString = stringBuilder.buildEmojiString(rowsCols[0], rowsCols[1], imageFile.name);

    // zip image
    console.log('calling zipper service to zip the emojis together');
    await ZipperService.zipImage(imageFile.name);

    // delete image-in and image-out
    console.log('deleting image-in and image-out files');
    fs.unlink(path.join(__dirname, `./image-in/${imageFile.name}`), (err) => { if (err) console.log(err);});
    rimraf(path.join(__dirname, `./image-out/${imageFile.name}`), (err) => { if (err) console.log(err);});

    // send back response
    console.log('cutter completed successfully, sending back file name');
    res.status(200).send({
        fileName: imageFile.name,
    });
});

router.get('/emoji/:name', (req, res) => {
    console.log('GET /emoji/:name');
    const fileName = req.params.name;
    const fileLocation = path.join(__dirname, `./zip-out/${fileName}.zip`);
    res.download(fileLocation);
});

// development playground
// require('./playground');

module.exports = router;