import { SET_EMOJI_STRING } from './types';

export const setEmojiString = emojiString => ({
  type: SET_EMOJI_STRING,
  payload: emojiString
});
