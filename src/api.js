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

router.post('/emoji', (req, res) => {
    // get and save file
    let imageFile = req.files.upfile;
    imageFile.mv(`./src/image-in/${imageFile.name}`).then((err) => {
        if (err)
            res.status(500).send(err);
    });

    // call cutting service
    CutterService.cutImage(imageFile.name);

    // zip image
    ZipperService.zipImage(imageFile.name);

    // send back file
    res.status(200).send('mnoice');
});

// development playground
// require('./playground');

module.exports = router;