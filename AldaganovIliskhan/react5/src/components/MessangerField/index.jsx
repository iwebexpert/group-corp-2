import React from 'react'

import './MessangerField.scss'
import { ChatList } from '../ChatList'
import { MessagesAdd } from './MessagesAdd'

export const MessangerField = ({ chats, onAddChat, onClickChat, activeChat, onAddMessage, chat, active, onRemoveChat, onEditChat }) => {
    return (
        <div className="messanger__field">
            <ChatList chats={chats} onAddChat={onAddChat} onClickChat={onClickChat} activeChat={activeChat} active={active} onRemoveChat={onRemoveChat} onEditChat={onEditChat} />
            <MessagesAdd messages={activeChat && activeChat.messages} onAddMessage={onAddMessage} chat={chat} chats={chats} />
        </div>
    )
}
