import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {addChat, chatsLoadAction, deleteChat} from "../../actions/chats"
import {setDrawer} from "../../actions/settings"
import {ChatList} from "./ChatList"
import {push} from 'connected-react-router'
import {AppState} from '../../reducers'

export const ChatListContainer = () => {
    const dispatch = useDispatch()

    const pathname = useSelector((state: AppState) => state.router.location.pathname)
    const chatId = pathname.includes('/chats/') ? pathname.replace('/chats/', '') : null
    const chats = useSelector((state: AppState) => state.chats.entries)
    const {darkTheme, isDrawerOpen} = useSelector((state: AppState) => state.settings)

    useEffect(() => {
        if(!chats.length) {
            dispatch(chatsLoadAction())
        }
    }, [])

    return <ChatList open={isDrawerOpen}
                     chats={chats}
                     chatId={chatId}
                     handleDrawerToggle={() => dispatch(setDrawer())}
                     addChat={(chatId: string, title: string) => dispatch(addChat(chatId, title))}
                     deleteChat={(chatId: string) => dispatch(deleteChat(chatId))}
                     redirect={(chatId: string) => dispatch(push(`/chats/${chatId}`))}
                     darkTheme={darkTheme}/>
}
