import { SET_EMOJI_STRING } from '../actions/types';

const initialState = {
    emojiString: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_EMOJI_STRING:
            return {
                ...state,
                emojiString: action.payload
            };
        default:
            return state;
    }
}