import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button, TextField} from "@material-ui/core"

export class MessageForm extends Component {
    state = {
        author: 'Timur',
        text: '',
        time: ''
    }

    static propTypes = {
        onSend: PropTypes.func.isRequired
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

        this.state.time = this.props.getTime()

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

        return <>

            <TextField
                label="Name"
                name="author"
                onChange={this.handleInputChange}
                value={author}
                className={this.props.classes.name}
                variant="outlined"
            />

            <TextField
                label="Message"
                onKeyDown={this.onKeyPress}
                name="text"
                onChange={this.handleInputChange}
                placeholder="Enter your message"
                value={text}
                variant="outlined"
                multiline
                autoFocus
                className={this.props.classes.text}
            />

            <Button onClick={this.handleMessageSend} className={this.props.classes.button} variant="contained" color="primary">
                Send Message
            </Button>
        </>
    }
}
