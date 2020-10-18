import React from "react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";

export const ChatList = (props) => {
    const { items } = props;

    return items.map((item) => (<List key={item.id} className="chat-root">
        <ListItem alignItems="flex-start" className={item.fire ? "new-message" : null}>
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
            <div className="delete-chat" onClick={() => props.handleDeleteChat(item.id)}>
                <DeleteForeverOutlinedIcon className="delete-chat-icon" />
            </div>
        </ListItem>
        <Divider variant="inset" component="li" />
    </List >));
};