import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Switch, Route, Link } from 'react-router-dom';
import { MessengerContainer } from 'containers/MessengerContainer';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { chats } from '../../helpers/chatsData';
import './layout.scss';
import { Header } from '../Header';

export class Layout extends React.Component {
  state = {
    chats,
    input: '',
  };

  handleChange = (value) => {
    this.setState({ ...this.state, input: value });
  };

  ChatAdd = () => {
    const { chats, input } = this.state;
    if (!input) {
      alert("Введите название чата");
      return;
    }
    chats.push({
      id: this.state.chats.length,
      title: input,
      img: './src/img/d.jpg',
      messages: [
        {
          id: 0,
          author: "default",
          text: "default message",
        },
        {
          id: 1,
          author: "default",
          text: "default message",
        },
      ],
    });
    this.setState({ chats });
  };

  render() {
    return (
      <>
        <div className="blockForFlex">
          <Header />
          <div className="commonBlock">
            <div className="chatsListBlock">
              <h2>Chats</h2>
              <div className="chatsList">
                <List>
                  {chats.map((chat) => (
                    <ListItem key={chat.id} className="listItem">
                      <ListItemAvatar>
                        <Avatar>
                          <img src={chat.img} />
                        </Avatar>
                      </ListItemAvatar>
                      <Link className="chatLink" to={`/chats/${chat.id}`}><ListItemText primary={chat.title} /></Link>
                    </ListItem>
                  ))}
                </List>
              </div>

              <div className="addChatBlock">
                <input onChange={(e) => this.handleChange(e.target.value)} type="text" className="chatName" value={this.input} />
                <button className="addChatButton" onClick={this.ChatAdd}>+</button>
              </div>
            </div>
            <div className="chatsMessenger">
              <Switch>
                <Route path="/chats/:id([0-9]+)" component={MessengerContainer} exact />
              </Switch>
            </div>
          </div>
        </div>
      </>
    );
  }
}
