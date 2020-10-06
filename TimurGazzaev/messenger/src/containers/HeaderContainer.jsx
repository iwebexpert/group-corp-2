import React, {useEffect} from 'react'
import {connect} from "react-redux"
import {setDrawer} from "../actions/settings"
import {Header} from "../components/Header/Header"
import {getMessages} from "../actions/chats";

export const ChatListContainer = ({isDrawerOpen, setDrawer, getMessages, profile}) => {

    useEffect(() => {
        getMessages()
    }, [])

    return <Header open={isDrawerOpen} setOpen={setDrawer} profile={profile}/>
}

function mapStateToProps(state){
    return {
        isDrawerOpen: state.settings.isDrawerOpen,
        profile: state.profile.profiles[0]
    }
}

export default connect(mapStateToProps, {setDrawer, getMessages})(ChatListContainer)
