import React, {Component} from "react";
import {Scrollbars} from "react-custom-scrollbars";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-regular-svg-icons";
import {DialogsCheck} from "./messageItem/DialogsCheck";
import List from "@material-ui/core/List";
import AddDialogModal from "../addDialog/AddDialog";
import {Link} from "react-router-dom";

export class DialogsItems extends Component {

    render() {
        let items = [];
        if(this.props.chats && this.props.chats.length){
            items = this.props.chats;
        }

        let friends = [];
        if(this.props.friends && this.props.friends.length){
            friends = this.props.friends;
        }

        return (
            <div className="dialogs_names">
                <div className="dialogs_title">
                    Сообщения
                    <div className="dialogs_create" onClick={this.props.showDeleteBtns}><FontAwesomeIcon icon={faEdit}/></div>
                </div>
                <hr/>
                <Scrollbars style={{width: 330, height: 470}}>
                    <List>
                        <DialogsCheck onDeleteDialog={this.props.onDeleteDialog} items={items}/>
                    </List>
                </Scrollbars>
                <div className="dialog_createArea">
                    <AddDialogModal friendsList={friends} onAddDialog={this.props.onAddDialog}/>
                </div>
            </div>
        );
    }
}