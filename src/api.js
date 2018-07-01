const express = require('express');

const CutterService = require('./services/cutter');
const ZipperService = require('./services/zipper');

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
    imageFile.mv(`./src/image-in/${imageFile.name}`).then((err) => {
        if (err)
            res.status(500).send(err);
    });

    // call cutting service
    await CutterService.cutImage(imageFile.name);

    // zip image
    await ZipperService.zipImage(imageFile.name);

    // send back file
    let fileName = imageFile.name + '.zip';
    res.set("Content-Disposition", `attachment;filename=${fileName}`);
    res.status(200).sendFile(__dirname + '/zip-out/' + fileName);
});

// development playground
// require('./playground');

module.exports = router;