import React, { useRef, useEffect, useState } from 'react';
import { ChatItem } from './ChatItem';
import { Preloader } from './../../Preloader';

export const ChatList = ({ chats }) => {
    const wrapper = useRef(null)
    const [fetching, setFetching] = useState(false)

    const scrollDown = () => {
        const linkOnWrapp = wrapper.current;
        linkOnWrapp.scrollTop = 9999;
    }

    useEffect(() => {
        if (chats.messages.length) {
            scrollDown()
            const { title } = chats;
            if (chats.messages[chats.messages.length - 1].author != title) {
                setFetching(true);
                return
            }
            setFetching(false)
        }
    })

    return (
        <>
            <div ref={wrapper} className="wrapper">
                {chats.messages.length ?
                    chats.messages.map((obj, index) => <ChatItem key={index} {...obj} title={chats.title} />) :
                    <p>Начните беседу первым:)</p>}
            </div>
            {fetching && <Preloader />}
        </>
    )
}