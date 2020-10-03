import React, { Component } from 'react'
import {List, IconButton, TextField, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
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

    render() {
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
                    <Link to={`/chats/2`} style={{ textDecoration: 'none' }}>
                        <IconButton aria-label="add" className={classes.root}>
                            <AddIcon />
                        </IconButton>
                    </Link>
                </div>
                
                
            </div>
            
        );
    }
}

export const ChatsList = withStyles(styles)(ChatsListClass);