import {sendMessage, toggleIsFetching} from '../actions/chats'
import {nanoid} from 'nanoid'
import {Middleware} from 'redux'

export const botMiddleware: Middleware = store => next => action => {
    if (action.type === 'SEND_MESSAGE') {
        const {author, time, chatId} = action.payload
        if (author !== 'Bot' && !store.getState().chats.isFetching) {
            store.dispatch(toggleIsFetching())
            setTimeout(() => {
                store.dispatch(
                    sendMessage({
                        id: nanoid(),
                        author: 'Bot',
                        text: `Hi, ${author}!`,
                        time: time,
                        chatId
                    })
                )
                store.dispatch(toggleIsFetching())
            }, 3000)
        }
    }
    return next(action)
}
