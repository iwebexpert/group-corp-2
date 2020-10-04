import React, {Component} from 'react';
import {nanoid} from 'nanoid';
import {Switch, Route, Link} from 'react-router-dom';
import {Container, Grid, List, ListItem, ListItemText} from '@material-ui/core';

import {MessageList} from '../MessageList';
import {MessageForm} from '../MessageForm';

// import {Home} from 'pages/Home';
// import {About} from 'pages/About';
// import {Error} from 'pages/Error';
import { Header } from '../Header/Header';

import {chats} from '../../helpers/chatsData';
import './Messenger.css';
import { ChatForm } from '../ChatForm/ChatForm';

export class Messenger extends Component
{
    state = {
        chats,
    };

    handleMessageSend = (message) => {
        const {chats} = this.state;
        const {match} = this.props;

        const chat = chats[match.params.id];
        message.id = nanoid();
        chat.messages = this.messages.concat([message])

       console.log(message, chat);

       chats[match.params.id] = chat;

        this.setState({
            chats,
        });
    };

    handleChatAdd = (chat) => {
      const { chats } = this.state;

      chat.id = chats.length;
      chat.messages = [];

      this.setState({
          chats: [...chats, chat]
      });
    }

    interval = null;

    componentDidUpdate(){
      clearInterval(this.interval);
        if(this.messages.length){
            const {author} = this.messages[this.messages.length - 1];
            if (author !== 'Bot'){
                this.interval = setTimeout(() => {
                    this.handleMessageSend({text: `Hi, ${author}! Это бот...`, author: 'Bot'});
                }, 2000);
            }
        }
        
    }

    get messages(){
        const {chats} = this.state;
        const {match} = this.props;

        let messages = null;

        if(match && chats[match.params.id]){
            messages = chats[match.params.id].messages;
        }

        return messages;
    }

    render()
    {
        console.log(this.state);
        const {chats} = this.state;
        const messages = this.messages;

        const chatsList = chats.map((item) => (
        <ListItem key={item.id}>
            <Link to={`/chats/${item.id}`}><ListItemText primary={item.title} /></Link>
        </ListItem>
        ));

        //console.log(this.props.match);

        return (
          <>
            <Container fixed>
              <Header />
              <Grid container spacing={1}>
                <Grid item xs={2}>
                  <div className='NavAndList'>
                    <List>
                      {chatsList}
                      <ListItem>
                        <Link to="/">
                          <ListItemText primary="Главная" />
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link to="/profile">
                          <ListItemText primary="Профиль" />
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link to="/about">
                          <ListItemText primary="О нас" />
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link to="/pagenotfount">
                          <ListItemText primary="Страница с ошибкой" />
                        </Link>
                      </ListItem>
                    </List>
                    
                  </div>
                  <ChatForm onSend={this.handleChatAdd}/>
                </Grid>
                <Grid item xs={10}>
                  <div className="messenger">
                    <div className="messages-list ">
                      {messages ? (
                        <MessageList items={messages} />
                      ) : (
                        <div>Выберите чат слева</div>
                      )}
                    </div>
                    {messages && (
                      <MessageForm onSend={this.handleMessageSend} />
                    )}
                  </div>
                </Grid>
              </Grid>
            </Container>
          </>
        );
    }
}