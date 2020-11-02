import update from 'react-addons-update'
import {Reducer} from 'redux'

import {ChatsActions} from '../actions/chats'

export type ChatsReducerState = {
    entries: any;
    isFetching: boolean;
    loading: boolean;
    error: boolean;
}

const initialState: ChatsReducerState = {
    entries: [],
    isFetching: false,
    loading: false,
    error: false
}

export const chatsReducer: Reducer<ChatsReducerState, ChatsActions> = (state = initialState, action: any) => {
    switch (action.type) {
        case 'CHATS_LOAD_REQUEST':
            return {
                ...state,
                loading: true,
                error: false,
            }

        case 'CHATS_LOAD_SUCCESS':
            return {
                ...state,
                loading: false,
                entries: action.payload,
            }

        case 'CHATS_LOAD_FAILURE':
            return {
                ...state,
                loading: false,
                error: true,
            }

        case 'SEND_MESSAGE':
            return update(state, {
                entries: {
                    [action.payload.chatId]: {
                        messages: {$push: [{id: action.payload.id, text: action.payload.text, author: action.payload.author}]},
                    },
                },
            });

        case 'DELETE_MESSAGE':
            let chatIndexDelete = state.entries.findIndex((chat: { id: { toString: () => any } }) => chat.id.toString() === action.payload.chatId)
            let index = state.entries.filter((chat: { id: { toString: () => any } }) => chat.id.toString() === action.payload.chatId)[0].messages.findIndex((message: { id: any }) => message.id === action.payload.messageId)
            return update(state, {
                entries: {
                    [chatIndexDelete]: {
                        messages: {
                            $splice: [[index, 1]]
                        }
                    }
                }
            })

        case 'ADD_CHAT':
            const {chatId, title} = action.payload
            return {
                ...state,
                entries: [
                    ...state.entries,
                    {
                        id: chatId,
                        title,
                        type: 1,
                        onFire: false,
                        messages: [],
                    }
                ]
            }

        case 'DELETE_CHAT':
            return {
                ...state,
                entries: state.entries.filter((chat: { id: any }) => chat.id !== action.payload)
            }

        case 'SET_ON_FIRE':
            let chatIndexFire = state.entries.findIndex((chat: { id: { toString: () => any } }) => chat.id.toString() === action.payload.chatId)
            return update(state, {
                entries: {
                    [chatIndexFire]: {
                        onFire: {
                            $set: action.payload.onFire
                        }
                    }
                }
            })

        case 'TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: !state.isFetching
            }

        default:
            return state
    }
}
