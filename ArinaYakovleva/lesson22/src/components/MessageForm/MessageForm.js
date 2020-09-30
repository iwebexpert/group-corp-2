import React, {Component} from 'react';
import './MessageForm.css';
import PropTypes from 'prop-types';
import {TextField, Fab, withStyles } from '@material-ui/core';
import {Send} from '@material-ui/icons';

const styles = {
    root: {
        margin: '5px',
        display: 'flex',
        justifyContent: 'center',
    },
    btn: {
        backgroundColor: 'lightblue',
    },
};

 class MessageFormClass extends Component{
    constructor(props){
        super(props);
        this.state = {
            input: '',
            author: '', 
        }

        this.onHandleChange = this.onHandleChange.bind(this);
        this.onHandleClick = this.onHandleClick.bind(this);
        this.onHandleKeyDown = this.onHandleKeyDown.bind(this);
    }


    onHandleChange(event){
        const target = event.target;
        const fieldName = target.name;

        this.setState({
            [fieldName]: target.value
        })
    }

    onHandleClick(){
        const { onSend } = this.props;
        const {input, author} = this.state;
        
         if(!input || !author){
             alert('Enter a text');
            return;
        }

        if(typeof onSend === 'function'){
            onSend(input, author);
            this.setState({
                input: '', 
                author: ''
            });
        }
    }

    onHandleKeyDown(event){
        if(event.keyCode === 13 && event.ctrlKey) {
            this.onHandleClick();
        }
    }

    render(){
        const {classes} = this.props;
        const {input, author} = this.state;
        return(
            <div className={classes.root}>

                    <TextField className="input-form" label="Message" 
                                name="input"
                                value={input}
                                onKeyDown = {this.onHandleKeyDown}
                                onChange={this.onHandleChange}
                                multiline
                                autoFocus />
                    <TextField className="author-input" label="Name"
                                name="author"
                                type="text" value={author} 
                                onKeyDown = {this.onHandleKeyDown}
                                onChange={this.onHandleChange}

                                />
                    <Fab 
                        variant="round" 
                        color="primary" 
                        onClick={this.onHandleClick}
                        className={classes.btn}
                        >
                         <Send />
                    </Fab>
            </div>
        );
    }
}

export const MessageForm = withStyles(styles)(MessageFormClass);

MessageForm.propTypes = {
        onSend: PropTypes.func.isRequired,   
}