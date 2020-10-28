import update from 'react-addons-update'

const initialState = {
    entries: [],
    isFetching: false,
    loading: false,
    error: false
}

export const chatsReducer = (state = initialState, action) => {
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

        case 'SEND_MESSAGE_LOAD_SUCCESS':
            let chatIndexSend = state.entries.findIndex(chat => chat.id.toString() === action.payload.chatId)
            return update(state, {
                entries: {
                        [chatIndexSend]: {
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
        case 'DELETE_MESSAGE':
            let chatIndexDelete = state.entries.findIndex(chat => chat.id.toString() === action.payload.chatId)
            let index = state.entries.filter(chat => chat.id.toString() === action.payload.chatId)[0].messages.findIndex(message => message.id === action.payload.messageId)
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
                entries: state.entries.filter(chat => chat.id !== action.payload)
            }

        case 'SET_ON_FIRE':
            let chatIndexFire = state.entries.findIndex(chat => chat.id.toString() === action.payload.chatId)
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
            return state;
    }
}
