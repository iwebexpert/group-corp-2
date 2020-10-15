import update from "react-addons-update";
import {
    CHATS_LOAD_REQUEST,
    CHATS_LOAD_SUCCESS,
    CHATS_LOAD_FAILURE,
    CHATS_MESSAGE_SEND_SUCCESS,
    ADD_CHAT_REQUEST,
    ADD_CHAT_SUCCESS,
    DELETE_MESSAGE_SUCCESS,
    CHAT_FIRE,
    CHAT_UNFIRE,
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
        case CHATS_MESSAGE_SEND_SUCCESS:
            return update(state, {
                entries: {
                    [action.payload.chatId]: {
                        messages: { $push: [{ id: action.payload.id, text: action.payload.text, author: action.payload.author }] },
                    },
                },
            });
        case ADD_CHAT_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            };

        case ADD_CHAT_SUCCESS:
            return update(state,
                {
                    loading: {
                        $set: false,
                    },
                    entries: {
                        $push: [{ id: state.entries.length, title: action.payload.title, fire: false, messages: [{ author: "Bot", text: "Напиши первое сообщение!", id: nanoid() }] }]
                    }
                });

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
        case DELETE_MESSAGE_SUCCESS:
            return update(state, {
                entries: {
                    [action.payload.chatId]: {
                        messages: {
                            $splice: [[action.payload.messageIndex, 1]],
                        },
                    },
                },
            });
        default:
            return state;
    }
};
