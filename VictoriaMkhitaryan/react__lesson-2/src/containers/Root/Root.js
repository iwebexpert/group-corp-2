import React, { Component } from 'react';
import './Root.css'

import MessageList from '../../component/MessagesList/MessagesList';
import MessageForm from '../../component/MessageForm/MessageForm';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import List from '@material-ui/core/List';

export default class Root extends Component {
  state = {
      messagesData: []
  };
  
  handleMessageSend = ({message, author}) => {
    this.setState({ ...this.state, messagesData: [...this.state.messagesData, {message: message, author: author ? author : 'Anonymous'}] });
  };

  componentDidUpdate() {
    let elem = document.getElementById('listScroll2');
    elem.scrollTop = elem.scrollHeight;

    if (this.state.messagesData.length%2 == 1) {
      setTimeout(() => {
        this.setState({ ...this.state, messagesData: [...this.state.messagesData, {author: "Robot", message: "пора спать..."}] });
      }, 1000);
    }
  }

  render() {
    return(
      <>
        <Card className="chat__card">
          <CardHeader className="chat__header" 
                      title="Чат с добрым Роботом" />
          <CardContent className="chat__content"
                        id="listScroll2">
            <List>
              <MessageList messagesData={this.state.messagesData} />
            </List>
          </CardContent>
          <CardActions className="chat__background-color">
            <MessageForm handleMessageSend={this.handleMessageSend} />
          </CardActions>
        </Card>
      </>
    );
  }
}