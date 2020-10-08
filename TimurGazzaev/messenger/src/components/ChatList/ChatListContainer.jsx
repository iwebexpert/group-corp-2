import React from 'react'
import {connect} from "react-redux"
import {addChat} from "../../actions/chats"
import {setDrawer} from "../../actions/settings"
import {ChatList} from "./ChatList"

export const ChatListContainer = ({chats, isDrawerOpen, addChat, setDrawer, darkTheme}) => {

    return <ChatList open={isDrawerOpen} chats={chats} handleDrawerToggle={setDrawer} addChat={addChat} darkTheme={darkTheme}/>
}

function mapStateToProps(state){
    return {
        chats: state.chats.entries,
        isDrawerOpen: state.settings.isDrawerOpen,
        darkTheme: state.settings.darkTheme
    }
}

export default connect(mapStateToProps, {addChat, setDrawer})(ChatListContainer)
