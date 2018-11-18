const express = require('express');
const path = require('path');

const router = express.Router();

const CutterService = require('../services/cutter');
const ZipperService = require('../services/zipper');
const stringBuilder = require('../services/string-builder');
const fileManager = require('../services/file-manager');
const ServerError = require('../models/ServerError');

/**
 * POST /emoji
 * requires a file in req.files names "upfile"
 * moves image to /image-in
 * cuts down an image into emoji pieces and places them in /image-out/<image name>
 * zips all the pieces together and places the zip filder in /zip-out
 */
router.post('/', async (req, res) => {
  let emojiName = req.query.name;
  if (!emojiName || stringBuilder.testEmojiName(req.query.name.toLowerCase())) {
    res.status(400).send(new ServerError(1, 'invalid emoji name'));
    return;
  }

  // get and save file
  let imageFile = req.files.upfile;
  if (!imageFile) {
    res.status(400).send(new ServerError(2, 'no file found'));
    return;
  }

  if (imageFile.truncated) {
    res.status(400).send(new ServerError(10, 'max file size exceeded'));
    return;
  }

  emojiName =
    emojiName.toLowerCase() + '.' + stringBuilder.getExtension(imageFile.name);

  try {
    await fileManager.moveFile(
      imageFile,
      path.join(__dirname, '../image-in'),
      emojiName
    );
  } catch (err) {
    fileManager.cleanEmojiFiles(emojiName);
    res
      .status(500)
      .send(new ServerError(3, 'Internal Server Error, cannot save file'));
    return;
  }

  // call cutting service
  let rowsCols = [];
  try {
    rowsCols = await CutterService.cutImage(emojiName);
  } catch (err) {
    fileManager.cleanEmojiFiles(emojiName);
    res.status(500).send(err);
    return;
  }

  // build emoji string
  let emojiString = stringBuilder.buildEmojiString(
    rowsCols[0],
    rowsCols[1],
    emojiName
  );

  // zip image
  try {
    await ZipperService.zipImage(emojiName);
  } catch (err) {
    fileManager.cleanEmojiFiles(emojiName);
    res.status(500).send(err);
    return;
  }

  // delete image-in and image-out
  fileManager.cleanEmojiFiles(emojiName);

  // send back response
  res.status(200).send({
    fileName: emojiName,
    emojiString: emojiString
  });
});

module.exports = router;
