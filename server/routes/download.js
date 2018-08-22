const express = require('express');
const path = require('path');

const router = express.Router();

/**
 * GET /download/:name
 * get download link for a large emoji based on its name
 */
router.get('/:name', (req, res) => {
    console.log('GET /emoji/:name');
    const fileName = req.params.name;
    const fileLocation = path.join(__dirname, `../zip-out/${fileName}.zip`);
    res.download(fileLocation);
});

module.exports = router;
