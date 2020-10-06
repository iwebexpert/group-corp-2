import React from 'react'
import './messenger.css'
import {BrowserRouter, Switch, Route} from "react-router-dom"
import { Container} from '@material-ui/core'
import {Error} from "./Error/Error"
import MessagesBlockContainer from "../containers/MessagesBlockContainer"
import ChatListContainer from "../containers/ChatListContainer"
import HeaderContainer from "../containers/HeaderContainer"
import ProfileContainer from "../containers/ProfileContainer"

export const Messenger = () => {
    return (
        <BrowserRouter>
            <HeaderContainer/>
            <Container>
                <ChatListContainer/>
                <Switch>
                    <Route path = '/chats/:id([0-9]+)' component={MessagesBlockContainer} exact/>
                    <Route path = '/profile' exact>
                        <ProfileContainer/>
                    </Route>
                    <Route path = '/' exact> </Route>
                    <Route path = '*'>
                        <Error/>
                    </Route>
                </Switch>
            </Container>
        </BrowserRouter>
    )
}
