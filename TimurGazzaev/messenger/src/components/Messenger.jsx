import React from 'react'
import './messenger.css'
import {BrowserRouter, Switch, Route} from "react-router-dom"
import {Container} from '@material-ui/core'
import {Error} from "./Error/Error"
import MessagesBlockContainer from "./MessagesBlock/MessagesBlockContainer"
import ChatListContainer from "./ChatList/ChatListContainer"
import HeaderContainer from "./Header/HeaderContainer"
import ProfileContainer from "./Profile/ProfileContainer"

export const Messenger = () => {

    return (
        <BrowserRouter>
            <Container>
                <HeaderContainer/>
                <ChatListContainer/>
                <Switch>
                    <Route path='/chats/:id' component={MessagesBlockContainer} exact/>
                    <Route path='/profile' exact>
                        <ProfileContainer/>
                    </Route>
                    <Route path='/' exact> </Route>
                    <Route path='*'>
                        <Error/>
                    </Route>
                </Switch>
            </Container>
        </BrowserRouter>
    )
}
