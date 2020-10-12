import React, {Component} from 'react';
import {Link, Switch, Route, BrowserRouter} from 'react-router-dom'
import {MessagesList} from "../MessageList/";
import {MessageForm} from "../MessageForm";
import {Header} from '../Messenger-Header';
import './Messenger.css';
import ListItemText from "@material-ui/core/ListItemText";

export class Messenger extends Component {


    // componentDidUpdate(prevProps, prevState) {
    //     const oldChats = this.state.chats;
    //     const newChats = this.props.name;
    //     console.log(oldChats, newChats);
    //     if (oldChats.length < newChats.length){
    //         this.setState(({chats})=> {
    //             return {
    //                 chats : [...newChats],
    //             }
    //         });
    //     }
    //
    //    console.log('mes was upd');
    //     if (this.messages.length) {
    //         setTimeout(() => {
    //             const {author} = this.messages[this.messages.length - 1];
    //             if (author !== 'Robot') {
    //                 this.handleMessageSend({text: 'Не приставай ко мне, я робот!', author: 'Robot'});
    //             }
    //         }, 3000);
    //     }
    // }



    render() {
        console.log('messenger',this.state, this.props);
        const {messages, handleMessageSend} = this.props;
        console.log(messages)
        return (<BrowserRouter>
                <div className={"messenger"}>
                    <div className="messages-list">
                        {messages ? <MessagesList items={messages}/> : <div>Выберите чат слева</div>}
                    </div>
                    {messages && <MessageForm onSend={handleMessageSend}/>}
                </div>
            </BrowserRouter>
        )
    }
}