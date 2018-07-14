const express = require('express');
const fs = require('fs');
const rimraf = require('rimraf');

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
    let imageFile = req.files.upfile;
    imageFile.mv(`./server/src/image-in/${imageFile.name}`).then((err) => {
        if (err)
            res.status(500).send(err);
    });

    // call cutting service
    let rowsCols = await CutterService.cutImage(imageFile.name);

    // build emoji string
    let emojiString = stringBuilder.buildEmojiString(rowsCols[0], rowsCols[1], imageFile.name);

    // zip image
    await ZipperService.zipImage(imageFile.name);

    // delete image-in and image-out
    fs.unlink(`./server/src/image-in/${imageFile.name}`, (err) => { if (err) console.log(err);});
    rimraf(`./server/src/image-out/${imageFile.name}`, (err) => { if (err) console.log(err);});

    // send back response
    res.status(200).send({
        fileName: imageFile.name,
    });
});

router.get('/emoji/:name', (req, res) => {
    const fileName = req.params.name;
    const fileLocation = __dirname + '/zip-out/' + fileName + '.zip';
    res.download(fileLocation);
});

// development playground
// require('./playground');

module.exports = router;