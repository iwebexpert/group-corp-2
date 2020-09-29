import React, {Component} from "react";
import './chatList.scss';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

const chats = ['@maxrusmos', '@radium', '@zhilinofcl', '@yakupova_aygulka', '@IbambykI'];

export class ChatList extends Component {
  render() {
    return (
      <div className="chatListBlock">
        <h2>Chats</h2>
          <List>
            <ListItem className="listItem">
              <ListItemAvatar>
                <Avatar>
                  <img src="./src/img/me.jpg"/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="@maxrusmos"/>
            </ListItem>
            <ListItem className="listItem">
              <ListItemAvatar>
                <Avatar>
                <img src="./src/img/roma.jpg"/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="@radium"/>
            </ListItem>
            <ListItem className="listItem">
              <ListItemAvatar>
                <Avatar>
                <img src="./src/img/dan.jpg"/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="@zhilinofcl"/>
            </ListItem>
            <ListItem className="listItem">
              <ListItemAvatar>
                <Avatar>
                <img src="./src/img/ajpg.jpg"/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="@yakupova_aygulka"/>
            </ListItem>
            <ListItem className="listItem">
              <ListItemAvatar>
                <Avatar>
                <img src="./src/img/v.jpg"/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="@IbambykI"/>
            </ListItem>
          </List>
      </div>
    );
  }
}