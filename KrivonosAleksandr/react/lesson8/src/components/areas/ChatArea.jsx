import React from 'react';
import DialogsNew from "./chatAreas/messagesItems/messageItem/DialogNew";
import {DialogsItemsContainer} from "../../containers/DialogsItemsContainer";
import {MessagesTextContainer} from "../../containers/MessagesTextContainer";

export const ChatArea = (props) => {

    const {addDialog, deleteDialog, newMsg, id} = props;

    return (
        <div className="container">
            <div className="chatArea">
                <DialogsItemsContainer onAddDialog={addDialog} onDeleteDialog={deleteDialog}/>
                {newMsg ? <DialogsNew/> : <MessagesTextContainer id={id}/>}
            </div>
        </div>
    );
}