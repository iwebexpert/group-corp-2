import React from 'react'

import './MessangerField.scss'
import ChatList from '../ChatList'
import { MessagesAdd } from './MessagesAdd'
import { Route } from 'react-router-dom'

export const MessangerField = ({ chats, onClickChat, activeChat, chat, active, addChat, removeChat, editChat, sendMessage, fireChat, isLoaded, addChatAction, isError }) => {
    return (
        <div className="messanger__field">
            <ChatList chats={chats} onClickChat={onClickChat} activeChat={activeChat} active={active} addChat={addChat} removeChat={removeChat} editChat={editChat} fireChat={fireChat} isLoaded={isLoaded} addChatAction={addChatAction} isError={isError} />
            <Route exact path="/chats/:id">
                <MessagesAdd messages={activeChat && activeChat.messages} sendMessage={sendMessage} chat={chat} chats={chats} addChat={addChat} fireChat={fireChat} />
            </Route>
        </div>
    )
}
