import React from 'react';
// для классов - withStyles, для функ.компонента - makeStyles
import {TextField, Fab,  makeStyles} from '@material-ui/core';
import {Send} from '@material-ui/icons';

import {useFormMess} from '../../hooks/useFormMess';

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

export const MessageForm = ({person, onSend}) => {
    const classes = useStyles();
    
    const textField = useFormMess();
    // Проверка введенных данных
    const isEmpty= (str) => {
        return (!str || /^\s*$/.test(str));
    }

    const handleMessageSend = () => {
        const text = textField.value;
        if(isEmpty(text) || isEmpty(person)){
            alert('Поле "Сообщение" пустое');
            
            return;
        }

        if(typeof onSend === 'function'){
            onSend(
                {
                    author: person, 
                    text,
                });
            textField.clearValue();
        }
    };

    const handleKeyDown = (event) => {
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