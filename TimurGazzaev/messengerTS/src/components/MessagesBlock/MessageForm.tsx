import React, {useState} from 'react'
import {Button, TextField} from "@material-ui/core"

import {MessageType} from './Message'

type MessageFormType = {
    onSend: (message: MessageType) => void;
    classes: any
}

export const MessageForm: React.FC<MessageFormType> = ({onSend, classes}) => {
    const [dataForm, setDataForm] = useState({
        author: 'Timur',
        text: '',
        time: ''
    })

    const getTime = (): string => {
        let date = new Date()
        let hours = date.getHours()
        let minutes = date.getMinutes()
        return `${hours}:${minutes > 9 ? minutes : `0${minutes}`}`
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setDataForm({
            ...dataForm,
            [event.target.name]: event.target.value
        })
    }

    const handleMessageSend = (): void => {
        const {author, text} = dataForm

        if (!text) {
            alert('Введите текст сообщения')
            return
        }

        if (!author) {
            alert('Введите имя автора')
            return
        }

        setDataForm({
            ...dataForm,
            time: getTime()
        })

        if (typeof onSend === 'function') {
            onSend(dataForm)
            setDataForm({
                ...dataForm,
                text: ''
            })
        }
    }

    const onKeyPress = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        if (event.keyCode === 13 && event.ctrlKey) {
            handleMessageSend()
        }
    }

    return <>
        <TextField
            label="Name"
            name="author"
            onChange={handleInputChange}
            value={dataForm.author}
            className={classes.name}
            variant="outlined"
        />

        <TextField
            label="Message"
            onKeyDown={onKeyPress}
            name="text"
            onChange={handleInputChange}
            placeholder="Enter your message"
            value={dataForm.text}
            variant="outlined"
            multiline
            autoFocus
            className={classes.text}
        />

        <Button onClick={handleMessageSend} className={classes.button} variant="contained" color="primary">
            Send Message
        </Button>
    </>
}
