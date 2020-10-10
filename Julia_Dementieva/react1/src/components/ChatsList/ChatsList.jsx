import React, { Component } from 'react'
import {List } from '@material-ui/core';

import {ChatItem} from '../ChatItem';
import {ChatForm} from '../ChatForm';
import {Error} from '../../pages/Error';

import './ChatsList.css'

export class ChatsList extends Component {

    handleChatAdd = (newchat) => {
        const {onAdd} = this.props;
        if (newchat) {
            if (typeof (onAdd) === 'function'){
                onAdd(newchat);
            }
        }
    }
    render() {
        const {chats, fireChats, onClick} = this.props;
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
                <ChatForm onSend={this.handleChatAdd}/>
            </div>) : <div>Данные загружаются</div>
        );
    }
}
