import React, {Component} from 'react';
import {MessagesText} from "./chatAreas/messagesText/MessagesText";
import {DialogsItems} from "./chatAreas/messagesItems/DialogsItems";

export class ChatArea extends Component {

    render() {
        return (
            <div className="container">
                <div className="chatArea">
                    <DialogsItems />
                    <MessagesText />
                </div>
            </div>
        );
    }
}