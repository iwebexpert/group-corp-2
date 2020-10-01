import React, { Component } from 'react'
import List from '@material-ui/core/List';

import { nanoid } from 'nanoid'

import {ChatItem} from '../ChatItem';

import './ChatsList.css'

export class ChatsList extends Component {
    state={

        chatsList:[
            {
                id: nanoid(),
                author: "Olga",
                avatar: "O",
            },
            {
                id: nanoid(),
                author: "Stanislav",
                avatar: "S",
            },
            {
                id: nanoid(),
                author: "Mikhail",
                avatar: "M",
            },
            
        ]
    }

    render() {
        const chatsList = this.state.chatsList;
        return (
            <div>
                <List>
                    {
                        chatsList.map((item) => <ChatItem avatar={item.avatar} author={item.author} key={item.id}/>)
                    }
                    
                </List>
  
            </div>
            
        );
    }
}