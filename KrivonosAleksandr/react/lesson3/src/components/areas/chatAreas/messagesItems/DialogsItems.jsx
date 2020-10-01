import React, {Component} from "react";
import {Scrollbars} from "react-custom-scrollbars";
import { nanoid } from 'nanoid'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-regular-svg-icons";
import {DialogsCheck} from "./messageItem/DialogsCheck";
import List from "@material-ui/core/List";

export class DialogsItems extends Component {

    state = {
        dialogsItems: [
            {
                id: nanoid(),
                name: "Антон Марник",
                lastMessage: "Lorem ipsum dolor sit amet!",
                image: ''
            },
            {
                id: nanoid(),
                name: "Георгий Грин",
                lastMessage: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
                image: ''
            },
            {
                id: nanoid(),
                name: "Евгений Иванов",
                lastMessage: "Lorem ipsum, consectetur adipisicing elit.",
                image: ''
            },
            {
                id: nanoid(),
                name: "Александр Котов",
                lastMessage: "Dolor sit amet elit.",
                image: ''
            }
        ]
    }

    render() {
        return (
            <div className="dialogs_names">
                <div className="dialogs_title">
                    Сообщения
                    <a href="/#" className="dialogs_create"><FontAwesomeIcon icon={faEdit}/></a>
                </div>
                <hr/>
                <Scrollbars style={{width: 330, height: 530}}>
                    <List>
                        <DialogsCheck items={this.state.dialogsItems}/>
                    </List>
                </Scrollbars>
            </div>
        );
    }
}