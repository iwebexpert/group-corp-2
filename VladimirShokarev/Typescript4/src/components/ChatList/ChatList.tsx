import React from "react";
import { Link } from "react-router-dom";
import {List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar} from "@material-ui/core";

type ChatListType = {
    items: Array<ChatType>;
};

export const ChatList: React.FC<ChatListType> = (props) => {
    const { items } = props;

    return <>
     {items.map((item) => (<List key={item.id} className="chat-root">
        <ListItem alignItems="flex-start" className={item.fire ? "new-message" : ""}>
            <ListItemAvatar>
                <Avatar alt="avatar">
                    {item.title.substr(0, 1)} </Avatar>
            </ListItemAvatar>
            <Link className="nav-link" to={`/chats/${item.id}`}>
                <ListItemText
                    primary={item.title}
                    secondary={
                        <React.Fragment>
                            {item.messages[item.messages.length - 1] && item.messages[item.messages.length - 1].text}
                        </React.Fragment>
                    }

                />
            </Link>
        </ListItem>
        <Divider variant="inset" component="li" />
    </List >))}
    </>
};