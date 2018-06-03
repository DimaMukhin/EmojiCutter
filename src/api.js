const express = require('express');

const router = express.Router();

/**
 * API Health status
 */
router.get('/', (req, res) => {
    res.status(200).send('ok');
});

router.post('/', (req, res) => {
    console.log('files', req.files);
    let sampleFile = req.files.upfile;

    sampleFile.mv('./filename.jpg', (err) => {
        if (err)
            return res.status(500).send(err);

        res.send('File uploaded!');
    });

    res.status(200).send('post ok');
});

// development playground
// require('./playground');

module.exports = router;