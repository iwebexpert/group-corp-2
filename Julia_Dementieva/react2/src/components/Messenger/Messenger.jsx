import React from 'react'
import {ListItem, ListItemText, ListItemAvatar, Avatar, CircularProgress } from '@material-ui/core';
import {MessageList} from '../MessageList';
import {MessageForm} from '../MessageForm';
import {Error} from '../../pages/Error';

import './Messenger.css';

export const Messenger = ({ onAdd, authorChat, namePerson, avatarChat, messages, isLoading }) => {

    const handleMessageSend = (message) => {
        if (typeof (onAdd) === 'function'){
            onAdd(message);
        }
    };

    if(isLoading) {
        return(<div className={"loading"}><CircularProgress /></div>)
    }
    return (
        (messages) ?
        (<div className="messenger">
            <div className="messages-info">
                <ListItem alignItems="center">   
                    <ListItemAvatar>
                    <Avatar src={avatarChat} />  
                    
                    </ListItemAvatar>
                    <ListItemText
                    primary={authorChat}
                    /> 
                </ListItem>
            </div>
            <div className="messages-list">
                {messages.length > 0 ? <MessageList  items={messages}/> : <div>Пока в чате сообщений нет</div>}
            </div>
            <div className="message-form"> 
                <MessageForm onSend={handleMessageSend} person={namePerson}/>
            </div>           
        </div>) : <Error />
    )
}

