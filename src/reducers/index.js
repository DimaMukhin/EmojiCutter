import { combineReducers } from 'redux';
import emojiReducer from './emojiReducer';

export default combineReducers({
  emoji: emojiReducer,
});