export const GET_CHATS = 'GET_CHATS'
export const SEND_MESSAGE = 'SEND_MESSAGE'
export const ADD_CHAT = 'ADD_CHAT'

export const getMessages = () => ({
    type: GET_CHATS
})

export const sendMessage = (message) => ({
    type: SEND_MESSAGE,
    payload: message
})

export const addChat = (chatName) => ({
    type: ADD_CHAT,
    payload: chatName
})
