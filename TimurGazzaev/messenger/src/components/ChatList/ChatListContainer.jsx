import React, {useEffect} from 'react'
import {connect} from "react-redux"
import {addChat, deleteChat, getMessages} from "../../actions/chats"
import {setDrawer} from "../../actions/settings"
import {ChatList} from "./ChatList"
import {createMatchSelector, push} from 'connected-react-router'

export const ChatListContainer = ({chatId, getMessages, chats, isDrawerOpen, addChat, deleteChat, redirect, setDrawer, darkTheme}) => {

    useEffect(() => {
        if(!chats.length)
            getMessages()
    }, [])

    return <ChatList open={isDrawerOpen} chats={chats} chatId={chatId} handleDrawerToggle={setDrawer} addChat={addChat}
                     deleteChat={deleteChat} redirect={redirect} darkTheme={darkTheme}/>
}

function mapStateToProps(state){
    const matchSelector = createMatchSelector("/chats/:chatId")
    const match = matchSelector(state)
    const chatId = match ? match.params.chatId : null
    return {
        chatId,
        chats: state.chats.entries,
        isDrawerOpen: state.settings.isDrawerOpen,
        darkTheme: state.settings.darkTheme
    }
}

function mapDispatchToProps(dispatch){
    return {
        getMessages: () => dispatch(getMessages()),
        setDrawer: () => dispatch(setDrawer()),
        addChat: (chatId, title) => dispatch(addChat(chatId, title)),
        deleteChat: (chatId) => dispatch(deleteChat(chatId)),
        redirect: (chatId) => dispatch(push(`/chats/${chatId}`)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatListContainer)
