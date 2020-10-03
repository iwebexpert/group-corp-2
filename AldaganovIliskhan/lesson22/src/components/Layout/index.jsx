import React from 'react'

import { Container, Grid } from '@material-ui/core'
import { Header } from '../Header'
import { Messanger } from '../Messanger'
import { ChatList } from '../ChatList'
import { Footer } from '../Footer'
import { Route } from 'react-router-dom'
import { chats } from '../helpers/chats'

export const Layout = () => {
    return (
        <>
            <Header />
            <Container>
                <Grid container spacing={2}>
                    <ChatList chats={chats} />
                    {/* <Route path='/chats/:id' component={Messanger} exact /> */}
                    <Route path='/chats/:id' render={(props) => <Messanger {...props} />} exact />
                </Grid>
            </Container>
            <Footer />
        </>

    )
}
