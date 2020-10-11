import update from 'react-addons-update';

import {
    CHATS_LOAD,
    CHATS_MESSAGE_SEND,
    CHATS_ADD
} from '../actions/chats';

const initialState = {
    entries: {},
    loading: false
};

import {chats} from '../components/Chats-data/ChatData';

export const chatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHATS_LOAD:
            return {
                ...state,
                entries: chats,
            };
        case CHATS_MESSAGE_SEND:
            return update(state, {
                entries: {
                    [action.payload.chatId]: {
                        messages: {
                            $push: [{
                                text: action.payload.text,
                                author: action.payload.author,
                                id: action.payload.id
                            }]
                        }
                    }
                }
            });
        case CHATS_ADD:
            return update(state, {
                entries: {
                    $push: [
                        {title: action.payload.chats.title,
                            messages: [{
                                id: 0,
                                author: 'WebDev',
                                text: 'Привет!'
                            },
                                {
                                    id: 1,
                                    author: 'WebDev',
                                    text: 'Что нового?'
                                },],
                            id: state.entries.length - 1}]
                }
            });
        default:
            return state;
    }
};
