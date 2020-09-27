import React, { Component } from 'react';
import './MessageForm.css';

import Button from '../Button/Button';

export default class MessageForm extends Component {
  state = {
    message: '',
    author: '',
  };

  handleInputChange = (event) => {
    const fieldName = event.target.name;
    this.setState({[fieldName]: event.target.value}); 
  };

  handleMessageSend = () => {
      const {handleMessageSend} = this.props;
      const {message} = this.state;

      if(!message){
          alert('Введите текст сообщения');
          return;
      }

      if(typeof handleMessageSend === 'function'){
        handleMessageSend(this.state);

          this.setState({message: ''});
      }
      
  };
  
  render() {
    const {message, author} = this.state;

    return(
      <>
        <div>
          <input name="author" 
                  type="text" 
                  onChange={this.handleInputChange} 
                  placeholder="Введите имя автора" 
                  value={author} />
        </div>
        <div>
          <textarea onKeyDown={() => {}} 
                    name="message" 
                    onChange={this.handleInputChange} 
                    placeholder="Введите текст сообщения" 
                    value={message} />
        </div>
        <div>
          <Button handleClick={this.handleMessageSend}
                  buttonText="Отправить сообщение" />
        </div>
      </>
    );
  }
}