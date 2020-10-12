import update from 'react-addons-update';
import * as types from './actionTypes';

const initialState = {
    entries: [],
    unreadMessage: [],
    loading: false
};

import { chats } from '../../helpers/chats';

export default function chatsReduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.CHATS_LOAD:
            return {
                ...state,
                entries: chats,
                unreadMessage: Array(chats.length).fill(false),
            }

        case types.SEND_MESSAGE:
            return update(state, {
                entries: {
                    [action.payload.chatId]: {
                        messages: {
                            $push: [{
                                id: action.payload.id,
                                message: action.payload.message,
                                author: action.payload.author
                            }]
                        }
                    }
                }
            })

        case types.ADD_CHAT:
            return {
                ...state,
                entries: [...state.entries, {id: state.entries[state.entries.length - 1].id + 1, title: action.payload, messages: []}]
            }
            
        case types.DELETE_CHAT:
            return update(state, {
                entries: {
                    $splice: [[action.index, 1]]
                }
            });

        case types.ADD_UNREAD_MESSAGE:
            return update(state, {
                unreadMessage: {
                    [+action.chatId] : {$set: true},
                }
            });

        case types.REMOVE_UNREAD_MESSAGE: 
            return update(state, {
                unreadMessage: {
                    [+action.chatId] : {$set: false},
                }
            });


        default:
            return state;
    }
};