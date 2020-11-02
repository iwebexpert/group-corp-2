import { ChatActionTypes, ChatActions } from "../actions/addChatAC";
import { Reducer } from 'redux';

export type ChatReducerState = {
    data: Array<NavbarListChat>,
    isFetching: boolean,
    loadingData: boolean,
    error: boolean,
}

const initialState: ChatReducerState = {
    data: [],
    isFetching: false,
    loadingData: false,
    error: false,
};

export const addChatReducer: Reducer<ChatReducerState, ChatActions> = (state = initialState, action): ChatReducerState => {
    switch (action.type) {
        case ChatActionTypes.CHATS_LOAD_REQUEST:
            return {
                ...state,
                loadingData: true,
                error: false,
            };

        case ChatActionTypes.CHATS_LOAD_SUCCESS:
            return {
                ...state,
                loadingData: false,
                data: action.payload,
            };

        case ChatActionTypes.CHATS_LOAD_FAILURE:
            return {
                ...state,
                loadingData: false,
                error: true,
            };

        case ChatActionTypes.IS_FETCHING:
            return {
                ...state,
                isFetching: action.bool
            }

        case ChatActionTypes.ADD_NEW_CHAT:
            let idChat = +Object.keys(state.data).pop()! + 1
            return {
                ...state,
                data: { ...state.data, [idChat]: { ...action.chat } }
            }

        case ChatActionTypes.DELETE_CHAT:
            let filterArr = Object.values(state.data).filter(el => el.id != action.chatId);
            return {
                ...state,
                data: { ...filterArr }
            }

        case ChatActionTypes.DELETE_MESSAGE:
            let id = Object.values(state.data).findIndex(el => el.id == action.chatId)
            let chat = Object.values(state.data).find(el => el.id == action.chatId);
            let newMessages = chat!.messages.filter(el => el.id.toString() != action.messageId);
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

        case ChatActionTypes.CHAT_FIRE:
            let id1 = Object.values(state.data).findIndex(el => el.id == action.chatId)
            return {
                ...state,
                data: {
                    ...state.data,
                    [id1]: {
                        ...state.data[id1],
                        fire: true
                    }
                }
            }

        case ChatActionTypes.CHAT_UNFIRE:
            let id2 = Object.values(state.data).findIndex(el => el.id == action.chatId)
            return {
                ...state,
                data: {
                    ...state.data,
                    [id2]: {
                        ...state.data[id2],
                        fire: false
                    }
                }
            }

        case ChatActionTypes.ADD_NEW_MESSAGE:
            let index = Object.values(state.data).findIndex(el => el.id == action.payload.chatId)
            return {
                ...state,
                data: {
                    ...state.data,
                    [index]: {
                        ...state.data[index],
                        messages: [
                            ...state.data[index].messages,
                            { id: action.payload.id, image: action.payload.image, message: action.payload.message, author: action.payload.author, chatId: index },
                        ],
                    }
                }
            };

        default: return state
    }
}