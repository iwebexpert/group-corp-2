import React from 'react'

import { Container, Grid } from '@material-ui/core'
import { Header } from './Header'
import { MessageField } from './MessageField'
import { ChatList } from './ChatList'
import { Footer } from './Footer'

export const Layout = () => {
    return (
        <>
            <Header />
            <Container>
                <Grid container spacing={2}>
                    <ChatList />
                    <MessageField />
                </Grid>
            </Container>
            <Footer />
        </>

    )
}
