import { SET_EMOJI_STRING } from './types';

export const setEmojiString = emojiString => {
  return {
    type: SET_EMOJI_STRING,
    payload: emojiString
  };
};
