import React from 'react'
import { LayoutHeader } from './LayoutHeader';
import { ChatList } from './ChatList';
import { ChatForm } from './ChatForm';

export const Layout = ({ chats, handleMessageSend }) => {
    return (
        <>
            <LayoutHeader chat={chats} />
            <ChatList chats={chats} />
            <ChatForm onMessageSend={handleMessageSend} />
        </>
    )
}
