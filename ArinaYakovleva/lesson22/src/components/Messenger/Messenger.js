import React, {Component} from 'react';
import './Messenger.css';
import {MessagesList} from '../MessagesList';
import {MessageForm} from '../MessageForm';
import { nanoid } from 'nanoid';
import {Header} from '../Header';
import Grid from '@material-ui/core/Grid';
import {ChatList} from '../ChatList';


export class Messenger extends Component{
    constructor(props){
        super(props);
        this.state ={
            messages: [ {message: 'Hi', author: 'Anna', id: nanoid()},
                        {message: 'Hey there', author: 'Olga', id: nanoid()},
                        {message: 'Hello', author: 'Alex', id: nanoid()}
                      ],
            interval: null,
        }
        
        this.onHandleMessageSend = this.onHandleMessageSend.bind(this);
    }
    
    onHandleMessageSend(newMessage, newAuthor){
        this.setState({
            messages: this.state.messages.concat({message: newMessage, author: newAuthor, id: nanoid()}),
        });

        clearTimeout(this.state.interval);
    }

    componentDidUpdate(){
        clearTimeout(this.state.interval);

        const {messages} = this.state;
        const name = messages[messages.length-1].author;
        const botAnswer = `Hey, ${name}, this is bot, welcome to chat`;

        this.state.interval = setTimeout(() => {
            this.onHandleMessageSend(botAnswer, 'Bot');
        }, 1000);
    }

    render(){
        const {messages} = this.state;
        return(<>
         <Grid container spacing={3}>
            <Grid item xs={12}>
                <Header />
            </Grid>
            <Grid item xs={4}>
                <ChatList />
            </Grid>
            <Grid item xs={8}>
               <h3 className="chat-bot">Chat with bot</h3>
                    <hr />
                    <MessagesList items={messages} />
                    <MessageForm onSend={this.onHandleMessageSend} />
            </Grid>

        </Grid>
            </>
        );   
    }
}