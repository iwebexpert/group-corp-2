import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Message from './Message';
import { botPhrases } from '../utils';

export default class MessageField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textFieldValue: '',
      overloadBot: {
        timer: null,
        tick: 0,
        maxTick: 5,
        text: 'Воу воу воу. Остановись! Хватит флудить',
      },
    };

    this.chatWindow = React.createRef();
  }

  botSendMessage() {
    const { overloadBot } = this.state;
    clearTimeout(overloadBot.timer);
    overloadBot.timer = setTimeout(() => {
      overloadBot.tick = 0;
      this.props.sendMessage(botPhrases(), 'bot');
    }, 1000);
  }

  handleSendMessage(text, sender) {
    if (text.length > 0) {
      this.props.sendMessage(text, sender);
      if (sender !== 'bot') {
        this.botSendMessage();
      }
      this.setState({ textFieldValue: '' });
      const chatWindow = this.chatWindow.current;
      setTimeout(() => {
        chatWindow.scrollTop = chatWindow.scrollHeight;
      });
    }
  }

  handleChange(event) {
    this.setState({ textFieldValue: event.target.value });
  }

  handleKeyUp(event) {
    if (event.keyCode === 13) {
      const { textFieldValue } = this.state;
      this.handleSendMessage(textFieldValue, 'me');
    }
  }

  render() {
    const {
      chatId, chats, messages,
    } = this.props;

    const messageElements = chats[chatId].messageList.map(messageId => <Message key={messages[messageId].id} message={messages[messageId]} />);

    return (
      <>
        <div className="message-field" ref={this.chatWindow}>{ messageElements }</div>
        <div className="text-field">
          <TextField
            onChange={this.handleChange.bind(this)}
            onKeyUp={this.handleKeyUp.bind(this)}
            fullWidth
            margin="normal"
            type="text"
            autoFocus
            placeholder="Write a message..."
            value={this.state.textFieldValue}
          />
          <button onClick={() => this.handleSendMessage(this.state.textFieldValue, 'me')} type="button">Отправить</button>
        </div>
      </>
    );
  }
}
MessageField.propTypes = {
  chatId: PropTypes.number.isRequired,
  chats: PropTypes.array.isRequired,
  messages: PropTypes.array.isRequired,
  sendMessage: PropTypes.func.isRequired,
};