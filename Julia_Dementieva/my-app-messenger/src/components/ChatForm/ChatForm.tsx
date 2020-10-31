import React, { Component } from 'react';
import {IconButton, TextField, makeStyles} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import {useFormMess} from '../../hooks/useFormMess';
import './ChatForm.css';


const useStyles = makeStyles({
    root: {
        color: 'blue',
    },
});

type ChatFormType = {
    onSend: (nameChat: string) => void;
}

export const ChatForm: React.FC<ChatFormType> = ({onSend}) => {
    const classes = useStyles();
    
    const nameChat = useFormMess();

    // Проверка введенных данных
    const isEmpty = (str: string | null): boolean => {
        return (!str || /^\s*$/.test(str));
    }

    const handleChatSend = (): void => {

        if(isEmpty(nameChat.value)){
            alert('Введите название чата');       
            return;
        }

        onSend(nameChat.value);
        nameChat.clearValue();
        
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
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