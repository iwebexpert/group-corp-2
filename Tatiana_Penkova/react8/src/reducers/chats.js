import update from "react-addons-update";
import {
    CHATS_LOAD_REQUEST,
    CHATS_LOAD_SUCCESS,
    CHATS_LOAD_FAILURE,
    CHATS_MESSAGE_SEND_REQUEST,
    CHATS_MESSAGE_SEND_SUCCESS,
    CHATS_MESSAGE_SEND_FAILURE,
    ADD_CHAT_REQUEST,
    ADD_CHAT_SUCCESS,
    ADD_CHAT_FAILURE,
    DELETE_MESSAGE_SUCCESS,
    DELETE_MESSAGE_REQUEST,
    DELETE_MESSAGE_FAILURE,
    CHAT_FIRE,
    CHAT_UNFIRE,
    DELETE_CHAT_REQUEST,
    DELETE_CHAT_SUCCESS,
    DELETE_CHAT_FAILURE,
} from "../actions/chats";
import { nanoid } from "nanoid";

const initialState = {
    entries: {},
    loading: false,
    error: false,
};

export const chatsReducer = (state = initialState, action) => {
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

        case CHATS_MESSAGE_SEND_REQUEST:
            return state;

        case CHATS_MESSAGE_SEND_SUCCESS:
            return update(state, {
                entries: {
                    [action.payload.chatId]: {
                        messages: { $push: [{ id: action.payload.id, text: action.payload.text, author: action.payload.author }] },
                    },
                },
            });

        case CHATS_MESSAGE_SEND_FAILURE:
            return state;

        case ADD_CHAT_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            };

        case ADD_CHAT_SUCCESS:
            console.log("&&&", state)
            return update(state,
                {
                    loading: {
                        $set: false,
                    },
                    entries: {
                        $push: [{ id: state.entries.length, title: action.payload.title, fire: false, messages: [{ author: "Bot", text: "Напиши первое сообщение!", id: nanoid() }] }]
                    }
                });

        case ADD_CHAT_FAILURE:
            return state;

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

        case DELETE_MESSAGE_REQUEST:
            return state;

        case DELETE_MESSAGE_SUCCESS:
            return state;
        case DELETE_MESSAGE_FAILURE:
            return state;

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
