import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { TextField } from '@material-ui/core'
import { Send } from '@material-ui/icons';
import { Fab } from '@material-ui/core'

import { sendMessageAction } from '../../../actions/chats'
import './MessangerForm.scss'

export const MessangerForm = ({ ============================================ }) => {
    const [author, setAuthor] = useState('');
    const [message, setMessage] = useState('');
    const diopatch = useDispatch();
    const onAdd = (message) => {
        if (!message) {
            alert('Введите сообщение');
            return;
        };
        if (!author) {
            alert('Введите имя');
            return;
        };
        diopatch(sendMessageAction(chat.id, author, message));
        setAuthor('');
        setMessage('');
    };

    const onKeyDownEnter = (e, message) => {
        if (e.ctrlKey && e.keyCode === 13) {
            onAdd(message);
        }
    };
    return (
        <div className="messanger__form" style={{ textAlign: 'center' }}>
            <TextField label="Введите имя" style={{ marginRight: '10px' }} value={author} onChange={(e) => setAuthor(e.target.value)} onKeyDown={(e) => onKeyDownEnter(e, message)} />
            <TextField label="Введите сообщение" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => onKeyDownEnter(e, message)} />
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
