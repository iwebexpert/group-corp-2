import React, {Component} from "react";
import {Scrollbars} from "react-custom-scrollbars";
import { nanoid } from 'nanoid'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-regular-svg-icons";
import {DialogsCheck} from "./messageItem/DialogsCheck";
import List from "@material-ui/core/List";
import AddDialogModal from "../addDialog/AddDialog";
import {friends} from "../../../../helpers/chatFriends";

export class DialogsItems extends Component {

    state = {
        friends: friends,
        chats: this.props.chats
    }

    createNewDialog = (newDialog) => {
        let {onAddDialog} = this.props;

        let addDialog = {
            id: this.props.chats[this.props.chats.length - 1].id + 1,
            name: newDialog.name,
            lastMessage: "Начните диалог первым",
            image: '',
            answerCount: 0,
            userName: '',
            botMessages: [],
            messages: []
        }

        onAddDialog(addDialog);

        let filteredFriends = this.state.friends.filter((item)=>item.id !== newDialog.id);

        this.setState({
            friends: filteredFriends
        })
    }

    render() {
        return (
            <div className="dialogs_names">
                <div className="dialogs_title">
                    Сообщения
                    <a href="/#" className="dialogs_create"><FontAwesomeIcon icon={faEdit}/></a>
                </div>
                <hr/>
                <Scrollbars style={{width: 330, height: 470}}>
                    <List>
                        <DialogsCheck items={this.state.chats}/>
                    </List>
                </Scrollbars>
                <div className="dialog_createArea">
                    <AddDialogModal friendsList={this.state.friends} onAddDialog={this.createNewDialog}/>
                </div>
            </div>
        );
    }
}