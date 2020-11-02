import React from 'react'
import { LayoutHeader } from './LayoutHeader';
import { ChatList } from './ChatList';
import { ChatForm } from './ChatForm';

type LayoutProps = {
    chats: NavbarListChat,
    handleMessageSend: (value: Message) => void,
    cleanAllMessagesAction: (id: number) => void,
    deleteMessageAction: (id: number, messId: string) => void
}

export const Layout: React.FC<LayoutProps> = ({ chats, handleMessageSend, cleanAllMessagesAction, deleteMessageAction }) => {
    return (
        <>
            <LayoutHeader chat={chats} cleanAllMessagesAction={cleanAllMessagesAction} />
            <ChatList chats={chats} deleteMessageAction={deleteMessageAction} />
            <ChatForm onMessageSend={handleMessageSend} />
        </>
    )
}
