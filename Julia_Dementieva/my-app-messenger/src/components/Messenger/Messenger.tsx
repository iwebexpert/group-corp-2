import React from 'react'
import {ListItem, ListItemText, ListItemAvatar, Avatar, CircularProgress } from '@material-ui/core';
import {MessageList} from '../MessageList';
import {MessageForm} from '../MessageForm';
import {Error} from '../../pages/Error';

import {MessageType} from '../../types/types';

import './Messenger.css';


type MessengerType = {
    onAdd: (message: MessageType) => void;
    authorChat: string;
    namePerson: string;
    avatarChat: string;
    messages: Array<MessageType>;
    isLoading: boolean;
};

export const Messenger: React.FC<MessengerType> = ({ onAdd, authorChat, namePerson, avatarChat, messages, isLoading }) => {

    const handleMessageSend = (message: MessageType ): void =>  {
        
        onAdd(message);
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
    );
}

