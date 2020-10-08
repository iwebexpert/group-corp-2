import React, {Component} from 'react';
import {Link, Switch, Route, BrowserRouter} from 'react-router-dom'
import {MessagesList} from "../MessageList/";
import {MessageForm} from "../MessageForm";
import {chats} from '../Chats-data/ChatData';
import {Header} from '../Messenger-Header';
import './Messenger.css';
import ListItemText from "@material-ui/core/ListItemText";

export class Messenger extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            chats,
        };
    }


    componentDidUpdate(prevProps, prevState) {
        const oldChats = this.state.chats;
        const newChats = this.props.name;
        if (oldChats.length < newChats.length){
            this.setState(({chats})=> {
                return {
                    chats : [...newChats],
                }
            });
        }
        
       console.log('mes was upd');
        if (this.messages.length) {
            setTimeout(() => {
                const {author} = this.messages[this.messages.length - 1];
                if (author !== 'Robot') {
                    this.handleMessageSend({text: 'Не приставай ко мне, я робот!', author: 'Robot'});
                }
            }, 3000);
        }
    }

    handleMessageSend = (message) => {
        const {chats} = this.state;
        console.log(chats);
        const {match} = this.props;
        const chat = chats[match.params.id];
        chat.messages = this.messages.concat([message]);
        this.setState({
            chats,
        });
    }

    get messages() {
        const {chats} = this.state;
        const {match} = this.props;
        // console.log([match.params.id]);
        let messages = null;

        if (match && chats[match.params.id]) {
            messages = chats[match.params.id].messages;
        }
        return messages;
    }


    // get bio() {
    //     const {chats} = this.state;
    //     const {match} = this.props;
    //     let title = match.params.id;
    //     // console.log(match, title);
    //     // console.log(chats[title].info[0]);
    //     // let index = chats.findIndex(elem => elem.id === title);
    //     let info = chats[title].info[0];
    //     // console.log(info)
    //     return info;
    // }


    render() {
        console.log('messanger',this.state, this.props);
        const messages = this.messages;
        console.log(messages)
        // const author = this.bio;
        // const {firstName, lastName, age, photo} = author;
        // const {match} = this.props;
        // const {chats, header} = this.state;
        // console.log(author, messages);
        return (<BrowserRouter>
        {/* <Header showInfo = {author}/> */}
                <div className={"messenger"}>
                    <div className="messages-list">
                        {messages ? <MessagesList items={messages}/> : <div>Выберите чат слева</div>}
                    </div>
                    {messages && <MessageForm onSend={this.handleMessageSend}/>}
                </div>
            </BrowserRouter>
        )
    }
}