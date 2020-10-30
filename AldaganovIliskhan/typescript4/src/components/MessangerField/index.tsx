import React from 'react'

import './MessangerField.scss'
import { ChatList } from '../ChatList'
import { MessagesAdd } from './MessagesAdd'
import { Route } from 'react-router-dom'

export const MessangerField = ({ chats, onClickChat, activeChat, chat } : any) : JSX.Element => {
    return (
        <div className="messanger__field">
            <ChatList chats={chats} onClickChat={onClickChat} activeChat={activeChat}  />
            <Route exact path="/chats/:id">
                <MessagesAdd messages={activeChat && activeChat.messages} chat={chat} chats={chats} />
            </Route>
        </div>
    )
}
