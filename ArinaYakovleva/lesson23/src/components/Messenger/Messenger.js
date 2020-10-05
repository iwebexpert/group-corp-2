import React, {Component} from 'react';
import './Messenger.css';
import {MessagesList} from '../MessagesList';
import {MessageForm} from '../MessageForm';
import { nanoid } from 'nanoid';
import {Header} from '../Header';
import Grid from '@material-ui/core/Grid';
import {ChatList} from '../ChatList';
import {chats} from '../../helpers/chatsData';
import {ChatsForm} from '../ChatsForm';

export class Messenger extends Component{
    constructor(props){
        super(props);
        this.state ={
            interval: null,
            chats
        }
        
        this.onHandleMessageSend = this.onHandleMessageSend.bind(this);
        this.addNewChat = this.addNewChat.bind(this);
    }
    
    onHandleMessageSend(newMessage, newAuthor){
        const {chats} = this.state;
        const {match} = this.props;
         console.log(match);
        const chat = chats[match.params.id];
        chat.messages = this.messages.concat({text: newMessage, author: newAuthor, id: nanoid()});

        chats[match.params.id] = chat;
        this.setState({chats});
        clearTimeout(this.state.interval);
    }
    
    addNewChat(chat){
        const { chats } = this.state;

        chat.title = chat.title;
        chat.id = chats.length;
        chat.messages = [];
      
        this.setState({
            chats: [...chats, chat],
        });
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

 
    componentDidUpdate(){
        if(this.messages.length){
            clearTimeout(this.state.interval);

            const name = this.messages[this.messages.length-1].author;
            const botAnswer = `Hey, ${name}, this is bot, welcome to chat`;
            if(name !== 'Bot'){
                this.state.interval = setTimeout(() => {
                    this.onHandleMessageSend(botAnswer, 'Bot');
                }, 1000);
            }

        }
        

    }

    render(){
        console.log(this.props);
        const messages = this.messages;
        return(<>
         <Grid container spacing={3}>
            <Grid item xs={12}>
                <Header />
            </Grid>
            <Grid item xs={4}>
                <ChatsForm onSend={this.addNewChat}/>
                <ChatList chats={this.state.chats}/>
            </Grid>
            <Grid item xs={8}>
               <h3 className="chat-bot">Chat</h3>
                    {messages ?<MessagesList items={messages} />:<div className="not-choosen">Choose chat</div>}
                    {messages && <MessageForm onSend={this.onHandleMessageSend} />}
            </Grid>

        </Grid>
            </>
        );   
    }
}