import update from 'react-addons-update';
import {chats} from '../helpers/Chats-data/ChatData';
import {
    CHATS_LOAD,
    CHATS_MESSAGE_SEND,
    CHATS_ADD
} from '../actions/chats';

const initialState = {
    entries: [...chats],
    loading: false
};



export const chatsReducer = (state = initialState, action) => {
    console.log('REDUCER REDUCER REDUCER',state);
    switch (action.type) {
        case CHATS_LOAD:
            return {
                ...state
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
            console.log('it was update', state);
            return update(state, {
                entries: {
                    $push: [action.payload]
                }
            });
        default:
            return state;
    }
};
