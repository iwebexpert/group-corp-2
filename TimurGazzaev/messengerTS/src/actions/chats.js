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

export const chatsLoadRequestAction = () => ({
    type: 'CHATS_LOAD_REQUEST',
})

export const chatsLoadSuccessAction = (data) => ({
    type: 'CHATS_LOAD_SUCCESS',
    payload: data,
})

export const chatsLoadFailureAction = (error) => ({
    type: 'CHATS_LOAD_FAILURE',
    payload: error,
})

export const chatsLoadAction = () => {
    return async (dispatch) => {
        try {
            dispatch(chatsLoadRequestAction())
            const result = await fetch('http://localhost:4000/chats?_embed=messages')
            dispatch(chatsLoadSuccessAction(await result.json()))
        } catch (error) {
            dispatch(chatsLoadFailureAction(error))
        }
    }
}

export const sendMessageLoadSuccessAction = (message) => ({
    type: 'SEND_MESSAGE_LOAD_SUCCESS',
    payload: message,
})

export const sendMessage = (message) => {
    return async (dispatch) => {
        try {
            const result = await fetch('http://localhost:4000/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(message)
            })
            dispatch(sendMessageLoadSuccessAction(message))
        } catch (error) {
            dispatch(chatsLoadFailureAction(error))
        }
    }
}
