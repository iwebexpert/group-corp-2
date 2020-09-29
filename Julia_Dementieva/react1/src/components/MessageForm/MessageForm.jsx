import React, { Component } from 'react';
// для классов - withStyles, для функ.компонента - makeStyles
import {Button, TextField, Fab, withStyles} from '@material-ui/core';
import {FullscreenExit, Send} from '@material-ui/icons';

const styles = {
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
};

class MessageFormClass extends Component {
    state={
        author: '',
        text: '',
    }

    handleInputChange = (event) => {
        const fieldName = event.target.name;
        this.setState({[fieldName]: event.target.value}); 
    };
    // Проверка введенных данных
    isEmpty(str) {
        return (!str || /^\s*$/.test(str));
    }

    handleMessageSend = () => {
        const {onSend} = this.props;
        const {author, text} = this.state;

        if(this.isEmpty(text) || this.isEmpty(author)){
            alert('Нужно заполнить все поля');
            
            return;
        }

        if(typeof onSend === 'function'){
            onSend(this.state);

            this.setState({
                text: '',
                author: '',
            });
        }
    };

    handleKeyDown = (event) => {
        if (event.key === 'Enter') this.handleMessageSend();
    };

    render() {
        const {text, author} = this.state;
        const {classes} = this.props;

        return (<div className={classes.root}>
            <TextField 
                label="Введите имя автора"
                name="author"
                type="text"
                value={author}
                onChange={this.handleInputChange}
                onKeyDown={this.handleKeyDown}
                autoFocus
                className={classes.textField}
                InputLabelProps={{style: {fontSize: 13}}}
            />

            <TextField 
                label="Введите текст сообщения"
                name="text"
                value={text}
                onChange={this.handleInputChange}
                onKeyDown={this.handleKeyDown}
                InputLabelProps={{style: {fontSize: 13}}}
                multiline
                
            />
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