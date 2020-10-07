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
        return (
            <div className="dialogs_names">
                <div className="dialogs_title">
                    Сообщения
                    <Link to="/chats/new" className="dialogs_create"><FontAwesomeIcon icon={faEdit}/></Link>
                </div>
                <hr/>
                <Scrollbars style={{width: 330, height: 470}}>
                    <List>
                        <DialogsCheck items={this.props.chats}/>
                    </List>
                </Scrollbars>
                <div className="dialog_createArea">
                    <AddDialogModal friendsList={this.props.friends} onAddDialog={this.props.onAddDialog}/>
                </div>
            </div>
        );
    }
}