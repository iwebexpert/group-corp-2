import { Button, Grid, TextField } from '@material-ui/core'

import React, { useState } from 'react'


export const ChatForm = ({ chatsData, onChatAdd }) => {
    const [inputValue, setInputValue] = useState('');
    const onClick = () => {
        if (inputValue) {
            const obj = {
                id: chatsData.length + 1,
                title: inputValue,
                messages: []
            }
            setInputValue('');
            onChatAdd(obj);
        }
        else {
            alert('Введите название чата');
        }
    }
    return (
        <Grid item xs={12} style={{ display: 'flex' }}>
            <TextField label="Введите название" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <Button variant="contained" onClick={onClick} color="primary" style={{ marginLeft: '10px' }}>Добавить</Button>
        </Grid>
    )
}
