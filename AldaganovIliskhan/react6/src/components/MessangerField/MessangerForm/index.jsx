import React, { useState } from 'react'

import { TextField } from '@material-ui/core'
import { Send } from '@material-ui/icons';
import { Fab } from '@material-ui/core'

import './MessangerForm.scss'
import axios from 'axios';
let timeout;
export const MessangerForm = ({ onAddMessage, chat, chats }) => {
    const [author, setAuthor] = useState('');
    const [message, setMessage] = useState('');
    const onAdd = (message) => {
        if (!message) {
            alert('Введите сообщение');
            return;
        };
        if (!author) {
            alert('Введите имя');
            return;
        }
        axios.post('http://localhost:3001/messages', {
            "chatId": chat.id,
            "message": message,
            "author": author,
        }).then(({ data }) => {
            onAddMessage(data, chat.id);
            clearTimeout(timeout);
            botAnswer();
            setAuthor('');
            setMessage('');
        });
    };
    const botAnswer = () => {
        timeout = setTimeout(() => {
            onAddMessage({
                "author": "Bot",
                "message": `Hi ${author}`
            }, chat.id)
        }, 1000)
    }
    const onKeyDownEnter = (e, message) => {
        if (e.ctrlKey && e.keyCode === 13) {
            onAdd(message);
        }
    }
    return (
        <div className="messanger__form" style={{ textAlign: 'center' }}>
            <TextField id='standart-basic' label="Введите имя" style={{ marginRight: '10px' }} value={author} onChange={(e) => setAuthor(e.target.value)} onKeyDown={(e) => onKeyDownEnter(e, message)} />
            <TextField id='standart-basic' label="Введите сообщение" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => onKeyDownEnter(e, message)} />
            <Fab
                variant="round"
                color="primary"
                onClick={() => onAdd(message)}
            >
                <Send />
            </Fab>
        </div>
    )
}
