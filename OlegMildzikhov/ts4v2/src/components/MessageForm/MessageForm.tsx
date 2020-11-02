import React from 'react';
import {TextField, Fab, makeStyles} from '@material-ui/core';
import {Send} from '@material-ui/icons';
import { nanoid } from 'nanoid';

import {useFormField} from '../../hooks/useFormField';

const useStyles = makeStyles({
    root: {
        backgroundColor: 'red',
    },
});

type MessageFormType = {
    onSend: (message: MesageType) => void;
};

export const MessageForm: React.FC<MessageFormType> = ({onSend}) => {

    const authorField = useFormField();
    const textField = useFormField();

    const handleMessageSend = (): void => {
        const author: string = authorField.value;
        const text: string = textField.value;

        if(!text){
            alert('Введите текст сообщения');
            return;
        }

        if(!author){
            alert('Введите автора сообщения');
            return;
        }

        onSend({author, text, id: nanoid()});
        textField.clearValue();
    };

    const handleEnterDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        if(event.ctrlKey && event.keyCode === 13){
            handleMessageSend();
        }
    };

    const classes = useStyles();
    return (<div>
        <TextField 
            label="Введите имя автора"
            name="author"
            type="text"
            value={authorField.value}
            onChange={authorField.onChange}
        />
        <TextField 
            label="Введите текст сообщения"
            name="text"
            {...textField}
            onKeyDown={handleEnterDown}
            multiline
            autoFocus
        />
        <Fab 
        variant="round" 
        color="primary" 
        onClick={handleMessageSend}
        className={classes.root}
        ><Send /></Fab>
    </div>);
};