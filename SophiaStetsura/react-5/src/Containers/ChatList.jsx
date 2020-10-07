import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { push } from 'connected-react-router';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { addChat, deleteChat } from '../Actions/chatActions';

class ChatList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleAddChat = this.handleAddChat.bind(this);
    this.handleNavigate = this.handleNavigate.bind(this);
    this.handleDeleteChat = this.handleDeleteChat.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleKeyUp(event) {
    if (event.keyCode === 13) { // Enter
      this.handleAddChat();
    }
  }

  handleAddChat() {
    if (this.state.input.length > 0) {
      this.props.addChat(this.state.input);
      this.setState({ input: '' });
    }
  }

  handleNavigate(link) {
    this.props.push(link);
  }

  handleDeleteChat(chatId) {
    this.props.deleteChat(chatId);
  }

  render() {
    const { chats } = this.props;
    return (
      <List dense className="chatList">
        { chats.map((chat, index) => {
          const labelId = `list-secondary-label-${chat.title + index}`;
          return (
            <ListItem key={chat.title} button className={`listItemChat ${chat.unreadMessage ? 'blink-chat' : ''}`} onClick={() => this.handleNavigate(`/chat/${index}/`)}>
              <ListItemText id={labelId} primary={chat.title} />

              <IconButton aria-label="delete" onClick={() => this.handleDeleteChat(index)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </ListItem>
          );
        }) }
        <ListItem
          className="add-new-chat"
          key="Add new chat"
          onClick={this.handleAddChat}
          style={{ height: '60px' }}
          children={(
            <TextField
              key="textField"
              fullWidth
              name="input"
              placeholder="Добавить новый чат"
              onChange={this.handleChange}
              value={this.state.input}
              onKeyUp={this.handleKeyUp}
            />
          )}
        />
      </List>
    );
  }
}

ChatList.propTypes = {
  chats: PropTypes.array,
  addChat: PropTypes.func,
  deleteChat: PropTypes.func,
  push: PropTypes.func,
};

ChatList.defaultTypes = {
  chats: [],
};

const mapStateToProps = ({ chatReducer }) => ({
  chats: chatReducer.chats,
});

const mapDispatchToProps = dispatch => bindActionCreators({ addChat, deleteChat, push }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);