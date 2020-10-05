import React, {Component} from 'react';
import {MessagesText} from "./chatAreas/messagesText/MessagesText";
import {DialogsItems} from "./chatAreas/messagesItems/DialogsItems";
import DialogsNew from "./chatAreas/messagesItems/messageItem/DialogNew";

export class ChatArea extends Component {

    state = {
        chats: this.props.chats,
    }

    changeState = (newChats) => {
        this.state.chats.push(newChats);
    }

    render() {
        let {chats} = this.state;
        console.log(chats);
        return (
            <div className="container">
                <div className="chatArea">
                    <DialogsItems chats={chats} onAddDialog={this.changeState}/>
                    {this.props.newMsg ? <DialogsNew /> : <MessagesText chats={chats} id={this.props.id}/>}
                </div>
            </div>
        );
    }
}