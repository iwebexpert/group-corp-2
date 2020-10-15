import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Switch, Route, Link} from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import {Star} from "@material-ui/icons";
import SaveIcon from '@material-ui/icons/Save';


export class ChatList extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        console.log(this.props.chatNames.chats.entries);
        const chatsList = this.props.chatNames.chats.entries;
        console.log(chatsList);

        return (
            <div className={'chatNmess'}>
                <List>
                 {chatsList.map((chat) => (
                        <ListItem  key={chat.id}>
                            <Link   to={`/chats/${chat.id}`}>
                                <span className={"chat__item"} >{chat.title}</span>
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </div>
        );
    }
}