import React from 'react'

import './MessangerField.scss'
import { ChatList } from '../ChatList'
import { MessagesAdd } from './MessagesAdd'
import { Route } from 'react-router-dom'
import { ChatsType } from '../../actions/chats'
type MessangerField = {
    chats : ChatsType[],
    onClickChat : (chat : ChatsType) => void,
    activeChat : any,
}
export const MessangerField : React.FC<MessangerField>= ({ chats, onClickChat, activeChat }) : JSX.Element => {
    return (
        <div className="messanger__field">
            <ChatList chats={chats} onClickChat={onClickChat} activeChat={activeChat}  />
            <Route exact path="/chats/:id">
                <MessagesAdd messages={activeChat && activeChat.messages} activeChat={activeChat}  />
            </Route>
        </div>
    )
}
