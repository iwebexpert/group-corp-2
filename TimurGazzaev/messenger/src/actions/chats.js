export const CHATS_LOAD = 'CHATS_LOAD'
export const CHATS_MESSAGE_SEND = 'CHATS_MESSAGE_SEND'

export const chatLoadAction = () => ({
    type: CHATS_LOAD
})

export const chatMessageSendAction = (message) => ({
    type: CHATS_MESSAGE_SEND,
    payload: message
})
