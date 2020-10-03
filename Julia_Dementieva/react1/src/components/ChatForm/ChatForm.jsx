import React, { Component } from 'react';
import {IconButton, TextField, withStyles} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { Link } from 'react-router-dom';

import './ChatForm.css'


const styles = {
    root: {
        color: 'blue',
    },
};

class ChatFormClass extends Component {
    state={
        nameChat: '',
    }

    handleInputChange = (event) => {
        this.setState({['nameChat']: event.target.value}); 
    };
    // Проверка введенных данных
    isEmpty(str) {
        return (!str || /^\s*$/.test(str));
    }

    handleChatSend = () => {
        
        const {onSend} = this.props;
        const {nameChat} = this.state;

        if(this.isEmpty(nameChat)){
            alert('Введите название чата');       
            return;
        }

        if(typeof onSend === 'function'){
            onSend(nameChat);

            this.setState({
                nameChat: '',
            });
        }
    };

    handleKeyDown = (event) => {
        if (event.key === 'Enter') this.handleChatSend();
    };

    render() {
        const {nameChat} = this.state;
        const {classes} = this.props;

        return (
            <div className='btnAddChat'>
                <TextField 
                    label="Введите название чата"
                    name="nameChat"
                    value={nameChat}
                    onChange={this.handleInputChange}
                    onKeyDown={this.handleKeyDown}
                    InputLabelProps={{style: {fontSize: 13}}}
                    multiline
                    fullWidth 
                />
                
                <IconButton aria-label="add" className={classes.root} onClick={this.handleChatSend}>
                    <AddIcon />
                </IconButton>
                
            </div>
        )
    }
}

export const ChatForm = withStyles(styles)(ChatFormClass);