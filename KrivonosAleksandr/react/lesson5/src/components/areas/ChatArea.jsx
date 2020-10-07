import React, {Component} from 'react';
import {MessagesText} from "./chatAreas/messagesText/MessagesText";
import {DialogsItems} from "./chatAreas/messagesItems/DialogsItems";
import DialogsNew from "./chatAreas/messagesItems/messageItem/DialogNew";
import {DialogsItemsContainer} from "../../containers/DialogsItemsContainer";
import {MessagesTextContainer} from "../../containers/MessagesTextContainer";

export class ChatArea extends Component {

    render() {
        return (
            <div className="container">
                <div className="chatArea">
                    <DialogsItemsContainer onAddDialog={this.props.addDialog}/>
                    {this.props.newMsg ? <DialogsNew /> : <MessagesTextContainer id={this.props.id}/>}
                </div>
            </div>
        );
    }
}