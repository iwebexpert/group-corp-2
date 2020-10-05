import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, TextField, Fab} from '@material-ui/core';
import {Send} from '@material-ui/icons';

export class MessageForm extends Component
{
    state = {
        text: '',
        author: '',
    };

    static propTypes = {
        onSend: PropTypes.func.isRequired,
    };

    // onChangeInputHandler = (event) => {
    //     this.setState({text: event.target.value});
    // };

    onChangeInputHandler = (event) => {
        const fieldName = event.target.name;
        this.setState({[fieldName]: event.target.value});
    };

    onSubmitForm = () => {
      const {onSend} = this.props;
      const {text, author} = this.state;

      if(!text){
          alert('Введите текст сообщения');
          return;
      }

      if(!author){
          alert('Введите автора сообщения');
          return;
      }

      if(typeof onSend === 'function'){
          onSend(this.state);

          this.setState({text: ''});
      }
    };

    keydownHandler = (event) => {
        if (event.keyCode === 13 && event.ctrlKey) {
            this.onSubmitForm();
        }
    }

    render()
    {
        const {text, author} = this.state;

        return (
          <div>
            <TextField
              variant="outlined"
              name="author"
              label="Автор"
              onChange={this.onChangeInputHandler}
              onKeyDown={this.keydownHandler}
              value={author}
            />
            <TextField
              variant="outlined"
              name="text"
              label="Введите текст сообщения"
              onChange={this.onChangeInputHandler}
              onKeyDown={this.keydownHandler}
              value={text}
              multiline
              autoFocus
            />
            <Fab variant="round" color="primary" onClick={this.onSubmitForm}>
              <Send />
            </Fab>
          </div>
        );
    }
}
