import { Grid } from '@material-ui/core'
import React from 'react'
import './ChatList.scss'
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { Switch, Route } from 'react-router-dom'

import { useHistory } from 'react-router-dom';
export const ChatList = ({ chats }) => {
    let history = useHistory();
    return (
        <Grid item xs={3}>
            <div className="chat-list">
                <List component="nav" aria-label="main mailbox folders">
                    {chats.map(chat => <ListItem button key={chat.id} onClick={() => history.push(`/chats/${chat.id}`)}>
                        <ListItemText primary={chat.title} />
                    </ListItem>)}
                </List>
            </div>
        </Grid>
    )
}
