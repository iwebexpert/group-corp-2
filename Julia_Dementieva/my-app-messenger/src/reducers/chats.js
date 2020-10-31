import update from 'react-addons-update';

import {
    CHATS_LOAD_REQUEST,
    CHATS_LOAD_FAILURE,
    CHATS_LOAD_SUCCESS,
    CHATS_MESSAGE_SEND,
    CHATSLISTS_SEND,
    MESSAGE_FIRE,
    MESSAGE_UNFIRE,
} from '../actions/chats';

const initialState = {
    entries: {},
    loading: false,
    ready: false,
    error: false,
    fireChatsId: [],
};

export const chatsReducer = (state = initialState, action) => {
    switch(action.type){
        case CHATS_LOAD_REQUEST:
            console.log('CHATS_LOAD_REQUEST',action.payload)
            return {
                ...state,
                loading: true,
                error: false,
                
            };
        case CHATS_LOAD_SUCCESS:
            console.log('CHATS_LOAD_SUCCESS',action.payload)
            return {
                ...state,
                loading: false,
                ready: true,
                entries: action.payload,
                fireChatsId: Array(action.payload.length).fill(false),
            };
    
        case CHATS_LOAD_FAILURE:
            console.log('CHATS_LOAD_FAILURE',action.payload)
            return {
                ...state,
                loading: false,
                error: true,
            };
        case CHATS_MESSAGE_SEND:
            console.log('CHATS_MESSAGE_SEND',action.payload)
            //react-addons-update
            return update(state, {
                entries: {
                    [action.payload.chatId]: {
                        messages: {$push: [{id: action.payload.id, text: action.payload.text, author: action.payload.author}]},
                    },
                },
            });
        case CHATSLISTS_SEND:
            console.log('CHATSLISTS_SEND', action.payload)
            return update(state, {
                entries: {$push: [{id: action.payload.id, author: action.payload.author, avatar: action.payload.avatar, messages: []}]},
            });

        case MESSAGE_FIRE:
            console.log('MESSAGE_FIRE', action.payload)
            return update(state, {
                fireChatsId: {
                    [+action.payload.chatId] : {$set: true},
                }
        });
        
        case MESSAGE_UNFIRE: 
        console.log('MESSAGE_UNFIRE', action.payload)
            return update(state, {
                fireChatsId: {
                    [+action.payload.chatId] : {$set: false},
                }
        });

        default:
            return state;
    }
};
