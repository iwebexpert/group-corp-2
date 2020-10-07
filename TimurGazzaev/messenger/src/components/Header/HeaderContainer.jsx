import React, {useEffect} from 'react'
import {connect} from "react-redux"
import {setDrawer, setDarkTheme} from "../../actions/settings"
import {Header} from "./Header"
import {getMessages} from "../../actions/chats"

export const ChatListContainer = ({isDrawerOpen, setDrawer, getMessages, profile, darkTheme, setDarkTheme}) => {

    useEffect(() => {
        getMessages()
        setDarkTheme(localStorage.getItem('theme') === 'dark')
    }, [])

    return <Header open={isDrawerOpen} setOpen={setDrawer} profile={profile} darkTheme={darkTheme} setDarkTheme={setDarkTheme}/>
}

function mapStateToProps(state){
    return {
        isDrawerOpen: state.settings.isDrawerOpen,
        profile: state.profile.profiles[0],
        darkTheme: state.settings.darkTheme
    }
}

export default connect(mapStateToProps, {setDrawer, getMessages, setDarkTheme})(ChatListContainer)
