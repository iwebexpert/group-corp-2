import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {addChat, chatsLoadAction, deleteChat} from "../../actions/chats"
import {setDrawer} from "../../actions/settings"
import {ChatList} from "./ChatList"
import {push} from 'connected-react-router'

export const ChatListContainer = () => {
    const dispatch = useDispatch()

    const pathname = useSelector((state) => state.router.location.pathname)
    const chatId = pathname.includes('/chats/') ? pathname.replace('/chats/', '') : null
    const chats = useSelector((state) => state.chats.entries)
    const {darkTheme, isDrawerOpen} = useSelector((state) => state.settings)

    useEffect(() => {
        if(!chats.length) {
            dispatch(chatsLoadAction())
        }
    }, [])

    return <ChatList open={isDrawerOpen}
                     chats={chats}
                     chatId={chatId}
                     handleDrawerToggle={() => dispatch(setDrawer())}
                     addChat={(chatId, title) => dispatch(addChat(chatId, title))}
                     deleteChat={(chatId) => dispatch(deleteChat(chatId))}
                     redirect={(chatId) => dispatch(push(`/chats/${chatId}`))}
                     darkTheme={darkTheme}/>
}
