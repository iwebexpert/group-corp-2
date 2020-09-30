import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button, TextField, withStyles} from "@material-ui/core"

const styles = {
    root: {

    }
}

class MessageFormClass extends Component {
    state = {
        author: 'Тимур',
        text: '',
        time: ''
    }

    static propTypes = {
        onSend: PropTypes.func.isRequired
    }

    getTime = () => {
        let date = new Date()
        return `${date.getHours()}:${date.getMinutes()}`
    }

    handleInputChange = (event) => {
        const fieldName = event.target.name
        this.setState({[fieldName]: event.target.value})
    }

    handleMessageSend = () => {
        const {onSend} = this.props
        const {author, text} = this.state

        if (!text) {
            alert('Введите текст сообщения')
            return
        }

        if (!author) {
            alert('Введите имя автора')
            return
        }

        this.state.time = this.getTime()

        if (typeof onSend === 'function') {
            onSend(this.state)

            this.setState({text: ''})
        }
    }

    onKeyPress = (event) => {
        if (event.keyCode === 13 && event.ctrlKey) {
            this.handleMessageSend()
        }
    }

    render() {
        const {text, author} = this.state

        return (<>

            <TextField
                label="Имя"
                name="author"
                onChange={this.handleInputChange}
                value={author}
                className={this.props.classes.name}
                variant="outlined"
            />

            <TextField
                label="Сообщение"
                onKeyDown={this.onKeyPress}
                name="text"
                onChange={this.handleInputChange}
                placeholder="Введите сообщение"
                value={text}
                variant="outlined"
                multiline
                autoFocus
                className={this.props.classes.text}
            />

            <Button onClick={this.handleMessageSend} className={this.props.classes.button} variant="contained" color="primary">Отправить сообщение</Button>

        </>)
    }
}

export const MessageForm = withStyles(styles)(MessageFormClass)
