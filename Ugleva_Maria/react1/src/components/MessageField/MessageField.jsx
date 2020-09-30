import React, { Component } from "react";
import { TextField,  Fab } from "@material-ui/core";
import {Send} from '@material-ui/icons';
import './MessageField.scss';
import { nanoid } from 'nanoid';
class MessageField extends Component {
  state = {
    text: "",
    author: "",
    id: nanoid()
  };
  handleChage = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSend = (e) => {
    e.preventDefault();
    if (!(this.state.text && this.state.author)) {
      alert("Заполните все поля");
      return;
    }
    this.props.onSend(this.state);
    this.setState({ text: "", author: "", id: nanoid() });
  };
  handleEnter = (e) => {
    if (e.keyCode === 13) {
      this.handleSend(e);
    }
  };
  render() {
    return (
      <>
        <form className='fields-inputs' onKeyDown={this.handleEnter}>
          <TextField
            label="Автор"
            name="author"
            value={this.state.author}
            type="text"
            onChange={this.handleChage}
          />
          <TextField
            id="standard-basic"
            label="Введите сообщение"
            name="text"
            value={this.state.text}
            onChange={this.handleChage}
            multiline
          />
          <Fab 
            variant="round" 
            color="primary" 
            onClick={this.handleSend}
            >
                <Send />
            </Fab>
        </form>
      </>
    );
  }
}
export default MessageField;
