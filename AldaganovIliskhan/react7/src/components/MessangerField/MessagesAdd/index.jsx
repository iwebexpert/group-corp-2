import React from 'react'

import { MessagesList } from '../MessagesList';
import './MessagesAdd.scss'
import MessangerForm from '../MessangerForm';
import { useHistory } from 'react-router-dom';
export const MessagesAdd = ({ messages, chat, chats, sendMessage }) => {
    let history = useHistory();
    return (
        <div className="messages__add">
            <MessagesList messages={messages} />
            {
                history.location.pathname !== '/' ? < MessangerForm sendMessage={sendMessage} chat={chat} chats={chats} /> : <div style={{ position: 'absolute', top: '150px', left: '50%' }}>Выберите чат</div>
            }
        </div>
    )
}
