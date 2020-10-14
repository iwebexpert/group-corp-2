import React, {Component} from 'react';
import DialogsNew from "./chatAreas/messagesItems/messageItem/DialogNew";
import {DialogsItemsContainer} from "../../containers/DialogsItemsContainer";
import {MessagesTextContainer} from "../../containers/MessagesTextContainer";

export class ChatArea extends Component {

    render() {
        const {addDialog, deleteDialog, newMsg, id} = this.props;

        return (
            <div className="container">
                <div className="chatArea">
                    <DialogsItemsContainer onAddDialog={addDialog} onDeleteDialog={deleteDialog}/>
                    {newMsg ? <DialogsNew /> : <MessagesTextContainer id={id}/>}
                </div>
            </div>
        );
    }
}