export const getMessages = () => ({
    type: 'GET_CHATS'
})

export const sendMessage = (message) => ({
    type: 'SEND_MESSAGE',
    payload: message
})

export const deleteMessage = (chatId, messageId) => ({
    type: 'DELETE_MESSAGE',
    payload: {chatId, messageId}
})

export const addChat = (chatId, title) => ({
    type: 'ADD_CHAT',
    payload: {chatId, title},
})

export const deleteChat = (chatId) => ({
    type: 'DELETE_CHAT',
    payload: chatId
})

export const toggleIsFetching = () => ({
    type: 'TOGGLE_IS_FETCHING',
})

export const setOnFire = (chatId, onFire) => ({
    type: 'SET_ON_FIRE',
    payload: {chatId, onFire}
})

