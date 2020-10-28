import React, {Component} from "react";
import {Scrollbars} from "react-custom-scrollbars";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-regular-svg-icons";
import {DialogsCheck} from "./messageItem/DialogsCheck";
import List from "@material-ui/core/List";
import AddDialogModal from "../addDialog/AddDialog";

export const DialogsItems = (props) => {

        let items = [];
        if(props.chats && props.chats.length){
            items = props.chats;
        }

        let friends = [];
        if(props.friends && props.friends.length){
            friends = props.friends;
        }

        return (
            <div className="dialogs_names">
                <div className="dialogs_title">
                    Сообщения
                    <div className="dialogs_create" onClick={props.showDeleteBtns}><FontAwesomeIcon icon={faEdit}/></div>
                </div>
                <hr/>
                <Scrollbars style={{width: 330, height: 470}}>
                    <List>
                        <DialogsCheck onDeleteDialog={props.onDeleteDialog} items={items}/>
                    </List>
                </Scrollbars>
                <div className="dialog_createArea">
                    <AddDialogModal friendsList={friends} onAddDialog={props.onAddDialog}/>
                </div>
            </div>
        );

}