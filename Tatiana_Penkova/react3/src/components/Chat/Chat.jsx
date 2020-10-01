import React, { Component } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import "./Chat.css";
import PropTypes from "prop-types";


export const chatType = {
    text: PropTypes.string,
};


export class Chat extends Component {

    static propTypes = chatType;

    render() {
        const { text, author } = this.props;
        const avatarLogo = author.substr(0, 1);

        return (<>

            <List className="chat-root">
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="avatar">
                            {avatarLogo}  </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={author}
                        secondary={
                            <React.Fragment>
                                {text}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
            </List>


        </>
        );
    }
}