import React from 'react';
import {TextField, Fab,  makeStyles} from '@material-ui/core';
import {Send} from '@material-ui/icons';

import {useFormMess} from '../../hooks/useFormMess';
import {MessageType} from '../Message';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent:'space-around',
        margin: '0 auto',
        marginTop: '15px',
        width: '90%',
    },
    btn: {
        backgroundColor: 'red',
    },
    label: {
        fontSize: '26',
    }
});


type MessageFormType = {
    person: string;
    onSend: (data: MessageType) => void;
} 

export const MessageForm: React.FC<MessageFormType> = ({person, onSend}) => {
    const classes = useStyles();
    
    const textField = useFormMess();
    // Проверка введенных данных
    const isEmpty = (str: string): boolean => {
        return (!str || /^\s*$/.test(str));
    }

    const handleMessageSend = (): void => {
        const text: string = textField.value;
        if(isEmpty(text) || isEmpty(person)){
            alert('Поле "Сообщение" пустое');
            
            return;
        }

        onSend(
            {
                author: person, 
                text,
            });
        textField.clearValue();
        
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleMessageSend();
        }
    };

    return (
        <div className={classes.root}>
            <TextField 
                label="Введите текст сообщения"
                name="text"
                value={textField.value}
                onChange={textField.onChange}
                onKeyDown={handleKeyDown}
                InputLabelProps={{style: {fontSize: 13}}}
                multiline
                fullWidth 
            />
            <Fab 
            variant="round" 
            color="primary" 
            onClick={handleMessageSend}
            className={classes.btn}
            >
                <Send />
            </Fab>
        </div>);
    
}