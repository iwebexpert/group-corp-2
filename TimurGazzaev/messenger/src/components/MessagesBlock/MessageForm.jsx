import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Button, TextField} from "@material-ui/core"

export const MessageForm = ({onSend, classes}) => {
    const [dataForm, setDataForm] = useState({
        author: 'Timur',
        text: '',
        time: ''
    })

    const getTime = () => {
        let date = new Date()
        let hours = date.getHours()
        let minutes = date.getMinutes()
        return `${hours}:${minutes > 9 ? minutes : `0${minutes}`}`
    }

    const handleInputChange = (event) => {
        setDataForm({
            ...dataForm,
            [event.target.name]: event.target.value
        })
    }

    const handleMessageSend = () => {
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

    const onKeyPress = (event) => {
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

MessageForm.propTypes = {
    onSend: PropTypes.func.isRequired,
}
