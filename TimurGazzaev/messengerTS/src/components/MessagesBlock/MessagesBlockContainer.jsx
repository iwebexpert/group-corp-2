import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {nanoid} from 'nanoid'
import {deleteMessage, sendMessage} from '../../actions/chats'
import {MessagesBlock} from "./MessagesBlock"

export const MessagesBlockContainer = () =>  {
    const dispatch = useDispatch()

    const isDrawerOpen = useSelector((state) => state.settings.isDrawerOpen)
    const isLoading = useSelector((state) => state.chats.loading)
    const chats = useSelector((state) => state.chats.entries)
    const pathname = useSelector((state) => state.router.location.pathname)
    const chatId = pathname.includes('/chats/') ? pathname.replace('/chats/', '') : null
    const messages = chats[chatId] ? chats[chatId].messages : null;


    const addMessage = (message) => {
        message.id = nanoid()
        dispatch(sendMessage({...message, chatId}))
    }

    const handleDeleteMessage = (messageId) => {
        dispatch(deleteMessage(chatId, messageId))
    }

    return <MessagesBlock messages={messages}
                          addMessage={addMessage}
                          open={isDrawerOpen}
                          handleDeleteMessage={handleDeleteMessage}
                          isLoading={isLoading}
    />
}
