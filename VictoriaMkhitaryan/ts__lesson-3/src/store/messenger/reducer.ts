import update from 'react-addons-update';
import { Reducer } from 'redux';
import { ChatsActionTypes, ChatActions } from './actionTypes';

export type ChatsReducerState = {
    entries: any;
    // loading: boolean;
    loading: boolean;
    error: boolean;
    unreadMessage: any;
};

const initialState: ChatsReducerState = {
    entries: {},
    unreadMessage: [],
    loading: false,
    // loading: false,
    error: false,
};

export const chatsReducer: Reducer<ChatsReducerState, ChatActions> = (state = initialState, action) => {
    switch (action.type) {
        case ChatsActionTypes.CHATS_LOAD_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case ChatsActionTypes.CHATS_LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                entries: action.payload,
            };
        
        case ChatsActionTypes.CHATS_LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };

        case ChatsActionTypes.SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
            };

        case ChatsActionTypes.SEND_MESSAGE:
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
            });

        case ChatsActionTypes.ADD_CHAT:
            console.log(state);
            console.log(action);
            return {
                ...state,
                loading: false,
                entries: [...state.entries, {id: state.entries[state.entries.length - 1].id + 1, title: action.payload, messages: []}]
            }
            
        case ChatsActionTypes.DELETE_CHAT:
            return update(state, {
                entries: {
                    $splice: [[action.index, 1]]
                }
            });
            
        case ChatsActionTypes.DELETE_MESSAGE:
            return update(state, {
                entries: {
                    [action.chatId]: {
                        messages: {
                            $splice: [[action.findMessage, 1]]
                        }
                    }
                }
            });

        case ChatsActionTypes.ADD_UNREAD_MESSAGE:
            // let unreadMessage = state.unreadMessage.includes(action.chatId);
            return update(state, {
                unreadMessage: {
                    [+action.chatId] : {$set: true},
                }
            });

        case ChatsActionTypes.REMOVE_UNREAD_MESSAGE: 
            return update(state, {
                unreadMessage: {
                    [+action.chatId] : {$set: false},
                }
            });

        default:
            return state;
    }
};