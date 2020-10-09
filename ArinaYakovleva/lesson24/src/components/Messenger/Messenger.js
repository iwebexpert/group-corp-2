import React, {Component} from 'react';
import './Messenger.css';
import {MessagesList} from '../MessagesList';
import {MessageForm} from '../MessageForm';
import {Header} from '../Header';
import Grid from '@material-ui/core/Grid';
import {ChatList} from '../ChatList';
import {ChatsForm} from '../ChatsForm';

export class Messenger extends Component{
 
    // componentDidUpdate(){
    //     if(this.messages !== null && this.messages.length){
    //         clearTimeout(this.state.interval);

    //         const name = this.messages[this.messages.length-1].author;
    //         const botAnswer = `Hey, ${name}, this is bot, welcome to chat`;
    //         if(name !== 'Bot'){
    //             this.state.interval = setTimeout(() => {
    //                 this.onHandleMessageSend(botAnswer, 'Bot');
    //             }, 1000);
    //         }

    //     }
    // }

    render(){
        const {messages, onHandleMessageSend, addNewChat, title, chats} = this.props;
        const chatsArr = Array.from(chats);
        return(<>
         <Grid container spacing={3}>
            <Grid item xs={12}>
                <Header />
            </Grid>
            <Grid item xs={4}>
                <ChatsForm onSend={addNewChat}/>
                <ChatList chats={chatsArr}/>
            </Grid>
            <Grid item xs={8}>
                    {messages ?<MessagesList  items={messages} title={title}/>:<div className="not-choosen">Choose chat</div>}
                    {messages && <MessageForm onSend={onHandleMessageSend} />}
            </Grid>

        </Grid>
            </>
        );   
    }
}