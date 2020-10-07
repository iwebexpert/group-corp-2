import { ADD_NEW_CHAT, LOAD_CHATS, ADD_NEW_MESSAGE } from "../actions/addChatAC";
import { chats } from "../helpers/chatData";

const initialState = { data: [] };

export const addChatReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CHATS:
            return {
                ...state,
                data: chats
            }

        case ADD_NEW_CHAT:
            return {
                ...state,
                data: { ...state.data, [action.chat.id]: { ...action.chat } }
            }

        case ADD_NEW_MESSAGE:
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.payload.chatId]: {
                        ...state.data[action.payload.chatId],
                        messages: [
                            ...state.data[action.payload.chatId].messages,
                            { image: action.payload.image, message: action.payload.message, author: action.payload.author },
                        ],
                    }
                }
            };

        default: return state
    }
}