import React from 'react'
import { LayoutHeader } from './LayoutHeader';
import { ChatList } from './ChatList';
import { ChatForm } from './ChatForm';

export const Layout = ({ chats, handleMessageSend, cleanAllMessagesAction, deleteMessageAction }) => {
    return (
        <>
            <LayoutHeader chat={chats} cleanAllMessagesAction={cleanAllMessagesAction} />
            <ChatList chats={chats} deleteMessageAction={deleteMessageAction} />
            <ChatForm onMessageSend={handleMessageSend} />
        </>
    )
}
