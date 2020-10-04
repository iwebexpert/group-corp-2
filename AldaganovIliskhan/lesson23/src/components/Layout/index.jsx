import React from 'react'

import { Container, Grid } from '@material-ui/core'
import { Header } from '../Header'
import { Messanger } from '../Messanger'
import { ChatList } from '../ChatList'
import { Footer } from '../Footer'
import { Profile } from '../Profile'
import { Route, Switch } from 'react-router-dom'
import { chats } from '../helpers/chats'
import { ChatForm } from '../ChatForm'
import { useState } from 'react'


export const Layout = () => {
    const [chatsData, setChatsData] = useState(chats);
    const onChatAdd = (obj) => {
        const newChat = [
            ...chatsData,
            obj
        ]
        setChatsData(newChat);
    }
    return (
        <>
            <Switch>
                <Route exact path="/profile"><Profile /></Route>
                <Route path="/">
                    <Header />
                    <Container>
                        <Grid container spacing={2}>
                            <ChatList chatsData={chatsData} />
                            <Route exact path='/chats/:id' render={(props) => <Messanger {...props} chats={chatsData} />} />
                            <ChatForm chatsData={chatsData} onChatAdd={onChatAdd} />
                        </Grid>
                    </Container>
                    <Footer />
                </Route>

            </Switch>

        </>

    )
}