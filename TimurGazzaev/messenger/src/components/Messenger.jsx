import React from 'react'
import './messenger.css'
import {BrowserRouter, Switch, Route} from "react-router-dom"
import {Container} from '@material-ui/core'
import {Error} from "./Error/Error"
import MessagesBlockContainer from "./MessagesBlock/MessagesBlockContainer"
import ChatListContainer from "./ChatList/ChatListContainer"
import HeaderContainer from "./Header/HeaderContainer"
import ProfileContainer from "./Profile/ProfileContainer"
import {connect} from "react-redux"

const Messenger = ({pathname}) => {
    return (
        <Container>
            <HeaderContainer/>
            <ChatListContainer/>
            {pathname === '/profile' && <ProfileContainer/>}
            {pathname.includes('/chats') && <MessagesBlockContainer/>}
            {/*{pathname === '*' && <Error/>}*/}
        </Container>
    )
}

const mapStateToProps = state => ({
    pathname: state.router.location.pathname,
})

export default connect(mapStateToProps, null)(Messenger)
