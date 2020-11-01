import update from "react-addons-update";
import {ChatsActions, ChatsActionTypes} from '../actions/chats';
import {Reducer} from 'redux';

export type ChatsReducerState = {
    entries: any;
    loading: boolean;
    error: boolean;
};

const initialState = {
    entries: {},
    loading: false,
    error: false,
};

export const chatsReducer: Reducer<ChatsReducerState, ChatsActions> = (state = initialState, action) => {
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
        case ChatsActionTypes.CHATS_MESSAGE_SEND_SUCCESS:
            return update(state, {
                entries: {
                    [action.payload.chatId]: {
                        messages: { $push: [{ id: action.payload.id, text: action.payload.text, author: action.payload.author }] },
                    },
                },
            });

            case ChatsActionTypes.ADD_CHAT_REQUEST:
                return {
                    ...state,
                    loading: true,
                    error: false,
                };
    
            case ChatsActionTypes.ADD_CHAT_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    error: false,
                };

        case ChatsActionTypes.CHAT_FIRE:
            return update(state, {
                entries: {
                    [action.payload]: {
                        fire: {
                            $set: true,
                        },
                    },
                },
            });
        case ChatsActionTypes.CHAT_UNFIRE:
            return update(state, {
                entries: {
                    [action.payload]: {
                        fire: {
                            $set: false,
                        },
                    },
                },
            });
        default:
            return state;
    };
};