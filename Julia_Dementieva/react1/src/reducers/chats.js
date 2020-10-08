import update from 'react-addons-update';

import {
    CHATS_LOAD,
    CHATS_MESSAGE_SEND,
    CHATSLISTS_SEND
} from '../actions/chats';

const initialState = {
    entries: {},
    loading: false,
};

import {chats} from '../helper/chatsData';

export const chatsReducer = (state = initialState, action) => {
    switch(action.type){
        case CHATS_LOAD:
            return {
                ...state,
                entries: chats,
                loading: true,
            };
        case CHATS_MESSAGE_SEND:
            //react-addons-update
            return update(state, {
                entries: {
                    [action.payload.chatId]: {
                        messages: {$push: [{id: action.payload.id, text: action.payload.text, author: action.payload.author}]},
                    },
                },
            });
        case CHATSLISTS_SEND:
            const newId = Object.keys(state.entries).length;
            return update(state, {
                entries: {$push: [{id: newId, author: action.payload.author, avatar: action.payload.avatar, messages: []}]},
            });

        default:
            return state;
    }
};