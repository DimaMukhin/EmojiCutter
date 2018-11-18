import axios from 'axios';

const FILE_ID = 'upfile';

const emojiCutterClient = {};

/**
 * Cut an image into a large emoji
 * Call server to handle the cutting. See POST /api/emoji for more details
 * @param {File} imageFile image file to cut (JPEF, BMP, PNG, etc..)
 * @param {string} emojiName the name of the large emoji
 * @param {Function<event>} uploadProgressHandler callback function. will be called with a progress event object every time upload progress is changed
 */
emojiCutterClient.cutImageToLargeEmoji = (
  imageFile,
  emojiName,
  uploadProgressHandler
) => {
  const formData = new FormData();
  formData.append(FILE_ID, imageFile, imageFile.name);
  return axios.post(`/api/emoji?name=${emojiName}`, formData, {
    onUploadProgress: uploadProgressHandler
  });
};

/**
 * Open the download link in a new window based on the name of the large emoji
 * @param {string} largeEmojiFileName the name of the large emoji
 */
emojiCutterClient.downloadEmojiInNewWindow = largeEmojiFileName => {
  window.open(`/api/download/${largeEmojiFileName}`);
};

export default emojiCutterClient;
