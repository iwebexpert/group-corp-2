import React, {Component} from 'react';
import {Container, Grid} from '@material-ui/core';
import { nanoid } from 'nanoid'

import {MessagesList} from '../MessagesList';
import {MessageForm} from '../MessageForm';

import './Messenger.css';
import { Header } from '../Header/Header';
import { List } from '../List/List';
import { Footer } from '../Footer/Footer';

export class Messenger extends Component {
    state = {
        messages: [
            {author: 'Web1', text: 'Привет', id: nanoid()}, 
            {author: 'Web1', text: 'Hi', id: nanoid()}, 
            {author: 'Web1', text: 'Тестовое сообщение', id: nanoid()}],
    };

    interval = null;

    handleMessageSend = (message) => {
        message.id = nanoid();
        this.setState({messages: this.state.messages.concat([message])});
    };

    componentDidUpdate(){
        clearInterval(this.interval);
        const {author} = this.state.messages[this.state.messages.length - 1];
        if(author !== 'Bot'){
            this.interval = setTimeout(() => {
                this.handleMessageSend({text: `Hi, ${author}! Бот на связи...`, author: 'Bot'});
            }, 3000);
        }
    }

    render(){
        const {messages} = this.state;

        return (
          <Container fixed>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Header />
              </Grid>
              <Grid item xs={2}>
                <List />
              </Grid>
              <Grid item xs={10}>
                <div className="messanger">
                  <MessagesList items={messages} />
                  <MessageForm onSend={this.handleMessageSend} />
                </div>
              </Grid>
              <Grid item xs={12}>
                <Footer/>
              </Grid>
            </Grid>
          </Container>
        );
    }
}