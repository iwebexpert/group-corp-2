import React, { useRef, useEffect } from 'react';
import { ChatItem } from './ChatItem';

type ChatListForm = {
    chats: NavbarListChat,
    deleteMessageAction: (id: number, messId: string) => void
}

export const ChatList: React.FC<ChatListForm> = ({ chats, deleteMessageAction }) => {
    const wrapper = useRef<HTMLDivElement>(null)

    const scrollDown = () => {
        const linkOnWrapp = wrapper.current!;
        linkOnWrapp.scrollTop = 9999;
    }

    useEffect(() => {
        if (chats && chats.messages) {
            scrollDown()
        }
    }, [chats])

    return (
        <>
            {chats && <div ref={wrapper} className="wrapper">
                {chats.messages &&
                    chats.messages.length ? chats.messages.map((obj, index) => <ChatItem key={index} {...obj} chatsId={chats.id} title={chats.title} deleteMessageAction={deleteMessageAction} />) :
                    <p>Начните беседу первым:)</p>}
            </div>}
        </>
    )
}