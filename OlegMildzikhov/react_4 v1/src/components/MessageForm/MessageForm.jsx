import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SendIcon from '@material-ui/icons/Send';
import {Fab, Input, InputLabel, InputAdornment, TextField } from "@material-ui/core";
import './MessageForm.css';
export class MessageForm extends Component {

    state = {
        text : '',
        author: '',
    };

    static propTypes = {
        onSend: PropTypes.func.isRequired,
    }


    handleInputChange = (e) => {
        const fieldName = e.target.name;
        this.setState({[fieldName]: e.target.value});
        console.log(this.state);

        if(e.keyCode === 13 && e.ctrlKey) {
            this.handleMessageSend();
        }
    }

    handleMessageSend = () => {
        const {onSend} = this.props;
        const {text, author} = this.state;

        if(!text || !author) {
            alert('Enter text message / author"s name');
            return;
        }
        if(typeof onSend === "function"){
            onSend(this.state);
            this.setState({text: ''});
        }
        console.log(this.state);
    };

    render() {
        const {text, author} = this.state;

        return (<div className="form__wrapper">
                <div>
                    <TextField  label="Author" type="text" name="author" onChange={this.handleInputChange} placeholder="enter author" value={author}/>
                </div>
                <div>
                    <TextField
                        id="outlined-multiline-static"
                        label="Message"
                        multiline
                        variant="outlined"
                        name="text" onChange={this.handleInputChange} onKeyDown ={this.handleInputChange} placeholder="enter text" value={text}
                    />
                </div>
                <div>
                    <Fab color="primary"
                         aria-label="add"
                         onClick={this.handleMessageSend}>
                        <SendIcon />
                    </Fab>
                </div>
            </div>
        )
    }
}