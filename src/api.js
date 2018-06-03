const express = require('express');

const router = express.Router();

/**
 * API Health status
 */
router.get('/', (req, res) => {
  res.status(200).send('ok');
});



// development playground
// require('./playground');

module.exports = router;