import {
    ADD_NEW_CHAT, ADD_NEW_MESSAGE, IS_FETCHING, CHAT_FIRE, CHAT_UNFIRE, DELETE_CHAT,
    CLEAN_ALL_MESSAGES, DELETE_MESSAGE, CHATS_LOAD_REQUEST, CHATS_LOAD_SUCCESS, CHATS_LOAD_FAILURE
} from "../actions/addChatAC";
import * as axios from "axios";

const initialState = {
    data: [],
    isFetching: false,
    loadingData: false,
    error: false,
};

export const addChatReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHATS_LOAD_REQUEST:
            return {
                ...state,
                loadingData: true,
                error: false,
            };

        case CHATS_LOAD_SUCCESS:
            return {
                ...state,
                loadingData: false,
                data: action.payload,
            };

        case CHATS_LOAD_FAILURE:
            return {
                ...state,
                loadingData: false,
                error: true,
            };

        case IS_FETCHING:
            return {
                ...state,
                isFetching: action.bool
            }

        case ADD_NEW_CHAT:
            return {
                ...state,
                data: { ...state.data, [action.chat.id]: { ...action.chat } }
            }

        case DELETE_CHAT:
            let filterArr = Object.values(state.data).filter(el => el.id != action.chatId);
            for (let i = 0; i <= filterArr.length - 1; i++) {
                filterArr[i].id = i
            }

            return {
                ...state,
                data: { ...filterArr }
            }

        case DELETE_MESSAGE:
            let chat = Object.values(state.data).find(el => el.id == action.chatId);
            let newMessages = chat.messages.filter(el => el.id.toString() != action.messageId);
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.chatId]: {
                        ...state.data[action.chatId],
                        messages: [...newMessages]
                    }
                }
            }

        case CLEAN_ALL_MESSAGES:
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.chatId]: {
                        ...state.data[action.chatId],
                        messages: []
                    }
                }
            }



        case CHAT_FIRE:
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.chatId]: {
                        ...state.data[action.chatId],
                        fire: true
                    }
                }
            }

        case CHAT_UNFIRE:
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.chatId]: {
                        ...state.data[action.chatId],
                        fire: false
                    }
                }
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
                            { id: action.payload.id, image: action.payload.image, message: action.payload.message, author: action.payload.author },
                        ],
                    }
                }
            };

        default: return state
    }
}