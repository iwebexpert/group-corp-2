import update from "react-addons-update";
import {
    CHATS_LOAD_REQUEST,
    CHATS_LOAD_SUCCESS,
    CHATS_LOAD_FAILURE,
    ADD_CHAT_REQUEST,
    ADD_CHAT_SUCCESS,
    ADD_CHAT_FAILURE,
    CHAT_FIRE,
    CHAT_UNFIRE,
    DELETE_CHAT_REQUEST,
    DELETE_CHAT_SUCCESS,
    DELETE_CHAT_FAILURE,
} from "../actions/chats";
import { InitialChatStateType, ActionChatType } from "../types";

const initialState: InitialChatStateType = {
    entries: {},
    loading: false,
    error: false,
};

export const chatsReducer = (state = initialState, action: ActionChatType): InitialChatStateType => {
    switch (action.type) {
        case CHATS_LOAD_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            };

        case CHATS_LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                entries: action.payload,
            };

        case CHATS_LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };

        case ADD_CHAT_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            };

        case ADD_CHAT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
            };

        case ADD_CHAT_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };

        case CHAT_FIRE:

            return update(state, {
                entries: {
                    [action.payload]: {
                        fire: {
                            $set: true,
                        },
                    },
                },
            });
        case CHAT_UNFIRE:
            return update(state, {
                entries: {
                    [action.payload]: {
                        fire: {
                            $set: false,
                        },
                    },
                },
            });

        case DELETE_CHAT_REQUEST:
            return state;

        case DELETE_CHAT_SUCCESS:
            return state;

        case DELETE_CHAT_FAILURE:
            return state;

        default:
            return state;
    }
};
