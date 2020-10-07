import update from "react-addons-update";
import { chats } from "../Helpers";
import {
    CHATS_LOAD,
    CHATS_MESSAGE_SEND,
    ADD_CHAT
} from "../actions/chats";

const initialState = {
    entries: {},
    loading: false,
};

export const chatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHATS_LOAD:
            return {
                ...state,
                entries: chats,
            };
        case CHATS_MESSAGE_SEND:
            return update(state, {
                entries: {
                    [action.payload.chatId]: {
                        messages: { $push: [{ id: action.payload.id, text: action.payload.text, author: action.payload.author }] },
                    },
                },
            });

        case ADD_CHAT:
            return update(state, {
                entries: {
                    $push: [
                        { title: action.payload.chat.title, messages: [], id: state.entries.length }]
                }
            });
        default:
            return state;
    }
};