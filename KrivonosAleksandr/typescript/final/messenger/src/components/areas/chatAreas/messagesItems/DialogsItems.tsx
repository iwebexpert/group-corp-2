import React from "react";
import {Scrollbars} from "react-custom-scrollbars";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-regular-svg-icons";
import {DialogsCheck} from "./messageItem/DialogsCheck";
import List from "@material-ui/core/List";
import {AddDialogModal} from "../addDialog/AddDialog";

type DialogsItemsTypes = {
    chats: chatsPayload[];
    friends: friendsPayload[];
    onAddDialog: (newDialog: newDialog) => void;
}

export const DialogsItems: React.FC<DialogsItemsTypes> = (props) => {

        let items: chatsPayload[] = [];
        if(props.chats && props.chats.length){
            items = props.chats;
        }

        let friends: friendsPayload[] = [];
        if(props.friends && props.friends.length){
            friends = props.friends;
        }


        return (
            <div className="dialogs_names">
                <div className="dialogs_title">
                    Сообщения
                    <div className="dialogs_create"><FontAwesomeIcon icon={faEdit}/></div>
                </div>
                <hr/>
                <Scrollbars style={{width: 330, height: 470}}>
                    <List>
                        <DialogsCheck items={items}/>
                    </List>
                </Scrollbars>
                <div className="dialog_createArea">
                    <AddDialogModal friendsList={friends} onAddDialog={props.onAddDialog}/>
                </div>
            </div>
        );

}