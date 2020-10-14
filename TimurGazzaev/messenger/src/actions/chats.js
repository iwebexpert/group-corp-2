export const deleteMessage = (chatId, messageId) => ({
    type: 'DELETE_MESSAGE',
    payload: {chatId, messageId}
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
            const result = await fetch('/api/chats?_embed=messages')
            dispatch(chatsLoadSuccessAction(await result.json()))
        } catch (error) {
            dispatch(chatsLoadFailureAction(error))
        }
    }
}

export const sendMessageLoadSuccessAction = (error) => ({
    type: 'SEND_MESSAGE_LOAD_SUCCESS',
    payload: error,
})

export const sendMessage = (message) => {
    return async (dispatch) => {
        try {
            dispatch(chatsLoadRequestAction())
            const result = await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(message)
            })
            dispatch(sendMessageLoadSuccessAction(await result.json()))
            dispatch(chatsLoadAction())
        } catch (error) {
            dispatch(chatsLoadFailureAction(error))
        }
    }
}

export const addChat = (chatId, title) => {
    return async (dispatch) => {
        try {
            dispatch(chatsLoadRequestAction())
            const result = await fetch('/api/chats', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: chatId,
                    title,
                    type: 1,
                    onFire: false,
                    messages: [],
                })
            })
            dispatch(chatsLoadAction())
        } catch (error) {
            dispatch(chatsLoadFailureAction(error))
        }
    }
}
