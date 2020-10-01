import { Grid } from '@material-ui/core'
import React from 'react'
import './ChatList.scss'
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
export const ChatList = () => {
    return (
        <Grid item xs={3}>
            <div className="chat-list">
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem button>
                        <ListItemText primary="Lorem, ipsum dolor." />

                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Lorem, ipsum dolor." />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Lorem, ipsum dolor." />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Lorem, ipsum dolor." />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Lorem, ipsum dolor." />
                    </ListItem>

                </List>
            </div>
        </Grid>
    )
}
