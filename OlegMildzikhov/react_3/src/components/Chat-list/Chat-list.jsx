import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import {Star} from "@material-ui/icons";
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 200,
        height: '87%',
        backgroundColor: "lightcoral",
    },
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

export  function ChatList() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">
                <ListItem button>
                    <ListItemIcon>
                        <SaveIcon />
                    </ListItemIcon>
                    <ListItemText primary="Сохраненные сообщения" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <Star />
                    </ListItemIcon>
                    <ListItemText primary="Важные сообщения" />
                </ListItem>
            </List>
            <Divider />
            <List component="nav" aria-label="secondary mailbox folders">
                <ListItem button>
                    <ListItemText primary="Софи" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Вова" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Сергей" />
                </ListItem>
                <ListItemLink href="#simple-list">
                    <ListItemText primary="Илья" />
                </ListItemLink>
            </List>
        </div>
    );
}