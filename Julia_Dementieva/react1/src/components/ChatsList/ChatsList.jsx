import React, { Component } from 'react'
import {List, IconButton, TextField, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { nanoid } from 'nanoid'

import {ChatItem} from '../ChatItem';
import {chats} from '../../helper/chatsData'

import './ChatsList.css'

const styles = {
    root: {
        color: 'blue',
    },
};

class ChatsListClass extends Component {
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
        const {classes} = this.props;
        return (
            <div className='chats'>
                <div className='chatsList'>
                <List>
                    {
                        chats.map((chat) => <ChatItem avatar={chat.avatar} author={chat.author} id={chat.id} key={chat.id}/>)
                    }
                    
                </List>
                </div>
                <div className='btnAddChat'>
                    <TextField 
                        label="Введите название чата"
                        name="text"
                        InputLabelProps={{style: {fontSize: 13}}}
                        multiline
                        fullWidth 
                    />
                    <IconButton aria-label="add" className={classes.root}>
                        <AddIcon />
                    </IconButton>
                </div>
                
                
            </div>
            
        );
    }
}

export const ChatsList = withStyles(styles)(ChatsListClass);