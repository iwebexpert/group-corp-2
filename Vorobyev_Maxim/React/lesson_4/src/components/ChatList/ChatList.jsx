import React, {Component} from "react";
import './chatList.scss';

import {chats} from '../../helpers/chatsData';
import {Messenger} from '../Messenger';
import {MessageField} from '../MessageField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import {Switch, Route, Link} from 'react-router-dom';

export class ChatList extends Component {
  state = {
    chats,
    newChatName: 'default',
  };

  addChat = () => {
    let newChatId = this.state.chats.length;
    let newChatData = {
      id: newChatId,
      title: this.state.newChatName,
      img: './src/img/d.jpg',
      messages: [
        {
          id: 0,
          author: 'WebDev',
          text: 'Привет',
        },
        {
          id: 1,
          author: 'WebDev',
          text: 'default',
        }, 
      ],
    };
    chats.push(newChatData);
    this.setState({chats: chats});
    console.log(this.state.chats[this.state.chats.length-1].messages);
  }

  handleInputChange = (event) => {
    this.setState({newChatName: event.target.value});
  }

  render() {
    return (
      <div className="chatListBlock">
        <h2>Chats</h2>
        <div>
          <List className="chatsListBlock">
            {chats.map((chat) => (
              <ListItem key={chat.id} className="listItem">
                <ListItemAvatar>
                  <Avatar>
                    <img src={chat.img}/>
                  </Avatar>
                </ListItemAvatar>
                <Link className="linkItem" to={`/chats/${chat.id}`}><ListItemText primary={chat.title}/></Link>
              </ListItem>
            ))}
          </List>
          <div className="addNewChatBlock">
            <input placeholder="Type Chat Name..." type="text" className="newChatName" name="newChatName" onChange={this.handleInputChange}/>
            <button className="addChatButton" onClick={this.addChat}>+</button>
          </div>
        </div>
      </div>
    );
  }
}