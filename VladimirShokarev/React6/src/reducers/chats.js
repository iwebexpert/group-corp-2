// import update from "react-addons-update";
// import { chats } from "../Helpers";
// import {
//     CHATS_LOAD,
//     CHATS_MESSAGE_SEND,
//     ADD_CHAT
// } from "../actions/chats";

// const initialState = {
//     entries: {},
//     loading: false,
// };

// export const chatsReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case CHATS_LOAD:
//             return {
//                 ...state,
//                 entries: chats,
//             };
//         case CHATS_MESSAGE_SEND:
//             return update(state, {
//                 entries: {
//                     [action.payload.chatId]: {
//                         messages: { $push: [{ id: action.payload.id, text: action.payload.text, author: action.payload.author }] },
//                     },
//                 },
//             });

//         case ADD_CHAT:
//             return update(state, {
//                 entries: {
//                     $push: [
//                         { title: action.payload.chat.title, messages: [], id: state.entries.length }]
//                 }
//             });
//         default:
//             return state;
//     }
// };

import update from "react-addons-update";
import { chats } from "../Helpers";
import {
    CHATS_LOAD,
    CHATS_MESSAGE_SEND,
    ADD_CHAT,
    DELETE_CHAT,
    DELETE_MESSAGE,
    CHAT_FIRE,
    CHAT_UNFIRE,
} from "../actions/chats";
import { nanoid } from "nanoid";

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
                        { title: action.payload.chat.title, fire: false, messages: [{ author: "Bot", text: "Бот на связи", id: nanoid() }], id: state.entries.length }]
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
        case DELETE_CHAT:
            return {
                ...state,
                entries: state.entries.filter((item) => item.id != action.payload.currentId)
            };
        case DELETE_MESSAGE:
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