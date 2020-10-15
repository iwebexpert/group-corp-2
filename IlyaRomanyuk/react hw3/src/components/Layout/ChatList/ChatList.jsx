import React, { useRef, useEffect } from 'react';
import { ChatItem } from './ChatItem';
import { Preloader } from './../../Preloader';

export const ChatList = ({ chats, deleteMessageAction }) => {
    const wrapper = useRef(null)

    const scrollDown = () => {
        const linkOnWrapp = wrapper.current;
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