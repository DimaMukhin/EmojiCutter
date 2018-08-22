const express = require('express');
const EmojiRoutes = require('./routes/emoji');
const DownloadRoutes = require('./routes/download');

const router = express.Router();

/**
 * API Health status
 */
router.get('/', (req, res) => {
    res.status(200).send('ok');
});

// routes
router.use('/emoji', EmojiRoutes);
router.use('/download', DownloadRoutes);

module.exports = router;
