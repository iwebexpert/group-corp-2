import React, { Component } from 'react';
// для классов - withStyles, для функ.компонента - makeStyles
import {TextField, Fab, withStyles} from '@material-ui/core';
import {Send} from '@material-ui/icons';

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
        author: this.props.person,
        text: '',
    }

    handleInputChange = (event) => {
        this.setState({['text']: event.target.value}); 
    };
    // Проверка введенных данных
    isEmpty(str) {
        return (!str || /^\s*$/.test(str));
    }

    handleMessageSend = () => {
        const {onSend} = this.props;
        const {author, text} = this.state;

        if(this.isEmpty(text) || this.isEmpty(author)){
            alert('Поле "Сообщение" пустое');
            
            return;
        }

        if(typeof onSend === 'function'){
            onSend(this.state);
            console.log('Form', onSend)
            this.setState({
                text: '',
            });
        }
    };

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.handleMessageSend();
        }
        
    };

    render() {
        const {text} = this.state;
        const {classes} = this.props;

        return (<div className={classes.root}>

            <TextField 
                label="Введите текст сообщения"
                name="text"
                value={text}
                onChange={this.handleInputChange}
                onKeyDown={this.handleKeyDown}
                InputLabelProps={{style: {fontSize: 13}}}
                multiline
                fullWidth 
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