import React from 'react'
import {List, CircularProgress } from '@material-ui/core';

import {ChatItem} from '../ChatItem';
import {ChatForm} from '../ChatForm';
import {Error} from '../../pages/Error';

import './ChatsList.css';

type Chat = {
    id: number;
    author: string;
    avatar: string;
}

type ChatItemType = {
    onClick: (id: number) => void;
    isLoading: boolean;
    onAdd: (newchat: string) => void;
    chats: Array<Chat>;
    fireChats: Array<boolean>;
}

export const ChatsList: React.FC<ChatItemType> = ({onAdd, chats, fireChats, onClick, isLoading}) => {

    const handleChatAdd = (newchat: string): void => {
        if (newchat) {
            onAdd(newchat);
        }
    }

    if(isLoading) {
        return(<div className={"loading"}><CircularProgress color="secondary"/></div>)
    }
    
    return (
        (chats) ?
        (<div className='chats'>
            <div className='chatsList'>
            <List>
                {
                    chats ? chats.map((chat) => <ChatItem avatar={chat.avatar} author={chat.author} id={chat.id} fire={fireChats[chat.id]} onClick={onClick} key={chat.id}/>) : <Error/>
                }             
            </List>
            </div>
            <ChatForm onSend={handleChatAdd}/>
        </div>) : <div>Данные загружаются</div>
    );
    
}
