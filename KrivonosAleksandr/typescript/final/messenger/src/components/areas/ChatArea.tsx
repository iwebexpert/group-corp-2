import React from 'react';
import DialogsNew from "./chatAreas/messagesItems/messageItem/DialogNew";
import {DialogsItemsContainer} from "../../containers/DialogsItemsContainer";
import {MessagesTextContainer} from "../../containers/MessagesTextContainer";

type DialogsTypes = {
    addDialog: (newChats: chatsPayload) => void;
    newMsg: boolean;
    id: number;
}

export const ChatArea: React.FC<DialogsTypes> = (props) => {

    const {addDialog, newMsg, id} = props;

    return (
        <div className="container">
            <div className="chatArea">
                <DialogsItemsContainer onAddDialog={addDialog}/>
                {newMsg ? <DialogsNew/> : <MessagesTextContainer id={id}/>}
            </div>
        </div>
    );
}