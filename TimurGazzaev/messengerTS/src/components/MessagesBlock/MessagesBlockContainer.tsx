import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {nanoid} from 'nanoid'
import {deleteMessage, sendMessage} from '../../actions/chats'
import {MessagesBlock} from "./MessagesBlock"
import {MessageType} from "./Message"
import {AppState} from '../../reducers'

export const MessagesBlockContainer: React.FC = () =>  {
    const dispatch = useDispatch()

    const isDrawerOpen = useSelector((state: AppState) => state.settings.isDrawerOpen)
    const chats = useSelector((state: AppState) => state.chats.entries)
    const pathname = useSelector((state: AppState) => state.router.location.pathname)
    const chatId = pathname.includes('/chats/') ? pathname.replace('/chats/', '') : null
    const messages = chats[chatId] ? chats[chatId].messages : null;

    const addMessage = (message: MessageType) => {
        message.id = nanoid()
        dispatch(sendMessage({...message, chatId}))
    }

    const handleDeleteMessage = (messageId: string) => {
        dispatch(deleteMessage(chatId, messageId))
    }

    return <MessagesBlock messages={messages}
                          addMessage={addMessage}
                          open={isDrawerOpen}
                          handleDeleteMessage={handleDeleteMessage}
    />
}
