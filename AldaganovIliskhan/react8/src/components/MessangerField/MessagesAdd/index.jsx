import React from 'react'

import { MessagesList } from '../MessagesList';
import './MessagesAdd.scss'
import { MessangerForm } from '../MessangerForm';
import { useSelector } from 'react-redux';
export const MessagesAdd = ({ messages, chat, chats }) => {
    const { pathname } = useSelector(({ router }) => router.location);
    return (
        <div className="messages__add">
            <MessagesList messages={messages} />
            {
                pathname !== '/' && < MessangerForm chat={chat} chats={chats} />
            }
        </div>
    )
}
