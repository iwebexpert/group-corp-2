import update from 'react-addons-update';
import {Reducer} from 'redux';

import {ChatsActions, ChatsActionTypes} from '../actions/chats2';

export type ChatsReducerState = {
    entries: any;
    loading: boolean;
    ready: boolean;
    error: boolean;
    fireChatsId: Array<boolean>; 
};

const initialState: ChatsReducerState = {
    entries: {},
    loading: false,
    ready: false,
    error: false,
    fireChatsId: [],
};

export const chatsReducer: Reducer<ChatsReducerState, ChatsActions> = (state = initialState, action) => {
    switch(action.type){
        case ChatsActionTypes.CHATS_LOAD_REQUEST:
            
            return {
                ...state,
                loading: true,
                error: false,
                
            };
        case ChatsActionTypes.CHATS_LOAD_SUCCESS:
            console.log('chatsload',action.payload)
            return {
                ...state,
                loading: false,
                ready: true,
                entries: action.payload,
                fireChatsId: Array(action.payload.length).fill(false),
            };
    
        case ChatsActionTypes.CHATS_LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case ChatsActionTypes.CHATS_MESSAGE_SEND:
            console.log('messagesend',action.payload)
            //react-addons-update
            return update(state, {
                entries: {
                    [action.payload.chatId]: {
                        messages: {$push: [{id: action.payload.id, text: action.payload.text, author: action.payload.author}]},
                    },
                },
            });
        case ChatsActionTypes.CHATSLISTS_SEND:
            console.log('shatslistsSend',action.payload);
            return update(state, {
                entries: {$push: [{id: action.payload.id, author: action.payload.author, avatar: action.payload.avatar, messages: []}]},
            });

        case ChatsActionTypes.MESSAGE_FIRE:
            console.log('messagefire',action.payload)
            return update(state, {
                fireChatsId: {
                    [+action.payload.chatId] : {$set: true},
                }
        });
        
        case ChatsActionTypes.MESSAGE_UNFIRE: 
        console.log('messageUnfire',action.payload)
            return update(state, {
                fireChatsId: {
                    [+action.payload.chatId] : {$set: false},
                }
        });

        default:
            return state;
    }
}; 