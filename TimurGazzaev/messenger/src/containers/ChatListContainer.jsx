import React, {useEffect} from 'react'
import {connect} from "react-redux"
import {addChat} from "../actions/chats"
import {setDrawer} from "../actions/settings"
import {ChatList} from "../components/ChatList/ChatList"

export const ChatListContainer = ({chats, isDrawerOpen, addChat, setDrawer}) => {

    return <ChatList open={isDrawerOpen} chats={chats} handleDrawerToggle={setDrawer} addChat={addChat}/>
}

function mapStateToProps(state, ownProps){
    return {
        chats: state.chats.entries,
        isDrawerOpen: state.settings.isDrawerOpen
    }
}

export default connect(mapStateToProps, {addChat, setDrawer})(ChatListContainer)
