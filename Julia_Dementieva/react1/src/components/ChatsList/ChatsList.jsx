import React, { Component } from 'react'
import {List } from '@material-ui/core';

import {ChatItem} from '../ChatItem';
import {ChatForm} from '../ChatForm';

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
        const {chats} = this.props;
        return (
            <div className='chats'>
                <div className='chatsList'>
                <List>
                    {
                        chats.map((chat) => <ChatItem avatar={chat.avatar} author={chat.author} id={chat.id} key={chat.id}/>)
                    }
                    
                </List>
                </div>
                <ChatForm onSend={this.handleChatAdd}/>
            </div>
        );
    }
}
