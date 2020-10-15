import React, { useState } from 'react'

import { Button, TextField } from '@material-ui/core';
import './ChatAdd.scss'

export const ChatAdd = ({ chats, addChatAction }) => {
    const [inputValue, setInputValue] = useState('');
    const onAdd = (inputValue) => {
        if (!inputValue) {
            alert('Введите название чата');
            return;
        };
        const newChat = {
            title: inputValue,
            messages: [],
            fire: false,
            id: chats.length === 0 ? 1 : chats[chats.length - 1].id + 1
        };

        addChatAction(newChat);
        setInputValue('');
    };
    const onKeyDownEnter = (e, inputValue) => {
        if (e.ctrlKey && e.keyCode === 13) {
            onAdd(inputValue);
        };
    };
    return (
        <div className="chat_add">
            <TextField id="standard-basic" label="Введите название чата" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => onKeyDownEnter(e, inputValue)} />
            <Button variant="contained" color="primary" onClick={() => onAdd(inputValue)}>Добавить чат</Button>
        </div>
    )
}