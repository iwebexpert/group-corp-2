import React from "react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

export const ChatList = (props) => {

    return props.items.map((item) => (<List key={item.id} className="chat-root">
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt="avatar">
                    {item.title.substr(0, 1)}  </Avatar>
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
    </List>));

}