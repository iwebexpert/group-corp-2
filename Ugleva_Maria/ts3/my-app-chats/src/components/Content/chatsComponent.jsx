import React from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import MessagesList from "../MessagesList";
import ChatsList from "../ChatsList";
import {Route} from 'react-router-dom';

const ChatsComponent = () => {
    return (
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Paper>
              <ChatsList />
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper>
                <Route path="/chats/:id" component={MessagesList} />
            </Paper>
          </Grid>
        </Grid>
    )
}
export default ChatsComponent;