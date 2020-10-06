import {
    CHATS_LOAD,
    CHATS_MESSAGE_SEND
} from '../actions/chats'

const initialState = {
    entries: {},
    loading: false
}

import {chats} from '../helpers/chatsData';

export const chatsReducer = (state = initialState, action) => {
    switch(action.type){
        case CHATS_LOAD:
            return {
                ...state,
                entries: chats,
            }
        default:
            return state;
    }
}
