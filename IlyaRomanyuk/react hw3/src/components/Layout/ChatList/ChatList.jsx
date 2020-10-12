import React, { useRef, useEffect } from 'react';
import { ChatItem } from './ChatItem';

export const ChatList = ({ chats }) => {
    const wrapper = useRef(null)
    const scrollDown = () => {
        const linkOnWrapp = wrapper.current;
        linkOnWrapp.scrollTop = 9999;
    }

    useEffect(() => {
        if (chats && chats.messages.length) {
            scrollDown()
        }
    }, [chats])

    return (
        <>
            {chats && <div ref={wrapper} className="wrapper">
                {chats.messages.length ?
                    chats.messages.map((obj, index) => <ChatItem key={index} {...obj} title={chats.title} />) :
                    <p>Начните беседу первым:)</p>}
            </div>}
        </>
    )
}