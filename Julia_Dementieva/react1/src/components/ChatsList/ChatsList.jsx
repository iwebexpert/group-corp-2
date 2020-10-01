import React, { Component } from 'react'
import List from '@material-ui/core/List';

import { nanoid } from 'nanoid'

import {ChatItem} from '../ChatItem';
import {chats} from '../../helper/chatsData'

import './ChatsList.css'

export class ChatsList extends Component {
    state={

        chatsList:[
            {
                id: nanoid(),
                author: "Rita",
                avatar: "https://i.pinimg.com/736x/fa/38/c3/fa38c3354e3795ea11c09e3df408a880.jpg",
            },
            {
                id: nanoid(),
                author: "Stanislav",
                avatar: "https://www.justthedesign.com/wp-content/uploads/2013/05/28.jpg",
            },
            {
                id: nanoid(),
                author: "Robot",
                avatar: "https://i.pinimg.com/736x/47/50/cb/4750cb647f221c4ebe51c33cc33c95df.jpg",
            },
            
        ]
    }

    render() {
        const chatsList = this.state.chatsList;
        return (
            <div>
                {/* <List>
                    {
                        chatsList.map((item) => <ChatItem avatar={item.avatar} author={item.author} key={item.id}/>)
                    }
                    
                </List> */}

                <List>
                    {
                        chats.map((chat) => <ChatItem avatar={chat.avatar} author={chat.author} id={chat.id} key={chat.id}/>)
                    }
                    
                </List>
  
            </div>
            
        );
    }
}