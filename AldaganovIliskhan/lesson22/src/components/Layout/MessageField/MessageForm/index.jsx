import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, Fab, withStyles } from '@material-ui/core';
import { Send } from '@material-ui/icons';

const styles = {
    root: {
        margin: '5px',
    },
    btn: {
        backgroundColor: 'red',
    },
    author: {
        marginRight: '15px'
    }
};

class MessageFormClass extends Component {
    state = {
        text: '',
        author: '',
    };

    static propTypes = {
        onSend: PropTypes.func.isRequired,
    };

    handleInputChange = (event) => {
        const fieldName = event.target.name;
        this.setState({ [fieldName]: event.target.value });
    };

    handleMessageSend = () => {
        const { onSend } = this.props;
        const { text, author } = this.state;

        if (!text) {
            alert('Введите текст сообщения');
            return;
        }

        if (!author) {
            alert('Введите автора сообщения');
            return;
        }

        if (typeof onSend === 'function') {
            onSend(this.state);

            this.setState({ text: '' });
            this.setState({ author: '' })
        }

    };

    handleEnterDown = (event) => {
        if (event.ctrlKey && event.keyCode === 13) {
            this.handleMessageSend();
        }
    };

    render() {
        console.log(this.props);
        const { text, author } = this.state;
        const { classes } = this.props;

        return (<div className={classes.root}>
            <TextField
                label="Введите имя автора"
                name="author"
                type="text"
                value={author}
                onChange={this.handleInputChange}
                onKeyDown={this.handleEnterDown}
                className={classes.author}
            />
            <TextField
                label="Введите сообщение"
                name="text"
                value={text}
                onChange={this.handleInputChange}
                onKeyDown={this.handleEnterDown}
                multiline
                autoFocus
            />
            {/* <Button 
            variant="outlined" 
            color="primary"
            onClick={this.handleMessageSend} 
            >Отправить сообщение</Button> */}
            <Fab
                variant="round"
                color="primary"
                onClick={this.handleMessageSend}
                className={classes.btn}
            >
                <Send />
            </Fab>
        </div>);
    }
}

export const MessageForm = withStyles(styles)(MessageFormClass);