import React, {useEffect} from 'react'
import {connect} from "react-redux"
import {setDrawer, setDarkTheme} from "../../actions/settings"
import {Header} from "./Header"
import {push} from "connected-react-router"

export const ChatListContainer = ({redirect, isDrawerOpen, setDrawer, profile, darkTheme, setDarkTheme}) => {

    useEffect(() => {
        document.documentElement.setAttribute("theme", darkTheme ? 'dark' : 'white')
    }, [])

    return <Header redirect={redirect} open={isDrawerOpen} setOpen={setDrawer} profile={profile}
                   darkTheme={darkTheme} setDarkTheme={setDarkTheme}/>
}

function mapStateToProps(state){
    return {
        isDrawerOpen: state.settings.isDrawerOpen,
        profile: state.profile.profiles[0],
        darkTheme: state.settings.darkTheme
    }
}

function mapDispatchToProps(dispatch){
    return {
        setDrawer: () => dispatch(setDrawer()),
        setDarkTheme: () => dispatch(setDarkTheme()),
        redirect: (path) => dispatch(push(path)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatListContainer)
