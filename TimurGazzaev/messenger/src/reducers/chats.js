import update from 'react-addons-update'

import {
    GET_CHATS,
    SEND_MESSAGE,
    ADD_CHAT
} from '../actions/chats'

const initialState = {
    entries: {},
    loading: false
}

import {chats} from '../helpers/chatsData'

export const chatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CHATS:
            return {
                ...state,
                entries: chats,
            }
        case SEND_MESSAGE:
            return update(state, {
                entries: {
                    [action.payload.chatId]: {
                        messages: {
                            $push: [{
                                id: action.payload.id,
                                text: action.payload.text,
                                author: action.payload.author,
                                time: action.payload.time
                            }]
                        }
                    }
                }
            })
        case ADD_CHAT:
            return {
                ...state,
                entries: [...state.entries, {id: state.entries.length, title: action.payload, type: 1, messages: []}]
            }
        default:
            return state;
    }
}
