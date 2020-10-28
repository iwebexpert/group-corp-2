import React from 'react';
import {Link} from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


export const ChatList = (props) => {

    const chatsList = props.chatNames.chats.entries;

    return (
        <div className={'chatNmess'}>
            <List>
                {chatsList.map((chat) => (
                    <ListItem key={chat.id}>
                        <Link to={`/chats/${chat.id}`}>
                            <span className={"chat__item"}>{chat.title}</span>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}