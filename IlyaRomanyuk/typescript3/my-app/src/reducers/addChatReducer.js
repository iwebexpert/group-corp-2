import {
    ADD_NEW_CHAT, ADD_NEW_MESSAGE, IS_FETCHING, CHAT_FIRE, CHAT_UNFIRE, DELETE_CHAT,
    DELETE_MESSAGE, CHATS_LOAD_REQUEST, CHATS_LOAD_SUCCESS, CHATS_LOAD_FAILURE
} from "../actions/addChatAC";

const initialState = {
    data: [],
    isFetching: false,
    loadingData: false,
    error: false,
};

export const addChatReducer = (state = initialState, action) => {
    let id = Object.values(state.data).findIndex(el => el.id == action.chatId)
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
            let idChat = +Object.keys(state.data).pop() + 1
            return {
                ...state,
                data: { ...state.data, [idChat]: { ...action.chat } }
            }

        case DELETE_CHAT:
            let filterArr = Object.values(state.data).filter(el => el.id != action.chatId);
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
                    [id]: {
                        ...state.data[id],
                        messages: [...newMessages]
                    }
                }
            }

        case CHAT_FIRE:
            return {
                ...state,
                data: {
                    ...state.data,
                    [id]: {
                        ...state.data[id],
                        fire: true
                    }
                }
            }

        case CHAT_UNFIRE:
            return {
                ...state,
                data: {
                    ...state.data,
                    [id]: {
                        ...state.data[id],
                        fire: false
                    }
                }
            }

        case ADD_NEW_MESSAGE:
            let index = Object.values(state.data).findIndex(el => el.id == action.payload.chatId)
            return {
                ...state,
                data: {
                    ...state.data,
                    [index]: {
                        ...state.data[index],
                        messages: [
                            ...state.data[index].messages,
                            { id: action.payload.id, image: action.payload.image, message: action.payload.message, author: action.payload.author },
                        ],
                    }
                }
            };

        default: return state
    }
}