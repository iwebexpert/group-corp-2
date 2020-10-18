import React from 'react'

import './MessangerField.scss'
import { ChatList } from '../ChatList'
import { MessagesAdd } from './MessagesAdd'
import { Route } from 'react-router-dom'

export const MessangerField = ({ chats, onClickChat, activeChat, chat, active }) => {
    return (
        <div className="messanger__field">
            <ChatList chats={chats} onClickChat={onClickChat} activeChat={activeChat} active={active} />
            <Route exact path="/chats/:id">
                <MessagesAdd messages={activeChat && activeChat.messages} chat={chat} chats={chats} />
            </Route>
        </div>
    )
}
