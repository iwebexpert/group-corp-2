import React, { Component } from 'react';
import {IconButton, TextField, makeStyles} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import {useFormMess} from '../../hooks/useFormMess';
import './ChatForm.css'


const useStyles = makeStyles({
    root: {
        color: 'blue',
    },
});

export const ChatForm = ({onSend}) => {
    const classes = useStyles();
    
    const nameChat = useFormMess();

    // Проверка введенных данных
    const isEmpty = (str) => {
        return (!str || /^\s*$/.test(str));
    }

    const handleChatSend = () => {

        if(isEmpty(nameChat.value)){
            alert('Введите название чата');       
            return;
        }

        if(typeof onSend === 'function'){
            onSend(nameChat.value);
            nameChat.clearValue();
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleChatSend();
        }
    };

    return (
        <div className='btnAddChat'>
            <TextField 
                label="Введите название чата"
                name="nameChat"
                value={nameChat.value}
                onChange={nameChat.onChange}
                onKeyDown={handleKeyDown}
                InputLabelProps={{style: {fontSize: 13}}}
                multiline
                fullWidth 
                inputProps={{ maxLength: 15 }}
            />
            
            <IconButton aria-label="add" className={classes.root} onClick={handleChatSend}>
                <AddIcon />
            </IconButton>
        </div>
    )
}