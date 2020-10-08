import React from 'react'

import './MessangerField.scss'
import { ChatList } from '../ChatList'
import { MessagesAdd } from './MessagesAdd'

export const MessangerField = ({ chats, onClickChat, activeChat, onAddMessage, chat, active, onEditChat, addChat, removeChat, editChat }) => {
    return (
        <div className="messanger__field">
            <ChatList chats={chats} onClickChat={onClickChat} activeChat={activeChat} active={active} onEditChat={onEditChat} addChat={addChat} removeChat={removeChat} editChat={editChat} />
            <MessagesAdd messages={activeChat && activeChat.messages} onAddMessage={onAddMessage} chat={chat} chats={chats} addChat={addChat} />
        </div>
    )
}
