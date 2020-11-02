import update from "react-addons-update";
import { ChatsActionTypes } from "../actions/chats";
import { Reducer } from "redux";
import { InitialChatStateType, ActionChatType } from "../types";

const initialState: InitialChatStateType = {
    entries: {},
    loading: false,
    error: false,
};

export const chatsReducer: Reducer<InitialChatStateType, ActionChatType> = (state = initialState, action) => {
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
        case ChatsActionTypes.ADD_CHAT_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
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
        case ChatsActionTypes.DELETE_CHAT_REQUEST:
            return state;

        case ChatsActionTypes.DELETE_CHAT_SUCCESS:
            return state;

        case ChatsActionTypes.DELETE_CHAT_FAILURE:
            return state;

        default:
            return state;
    }
};
