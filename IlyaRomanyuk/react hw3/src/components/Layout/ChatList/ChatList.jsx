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
        scrollDown()
        if (chats[chats.length - 1].name !== 'Helga Källström') {
            setFetching(true)
            return
        }
        setFetching(false)

    }, [chats])

    return (
        <>
            <div ref={wrapper} className="wrapper">
                {chats.map((obj, index) => <ChatItem key={index} {...obj} />)}
            </div>
            {fetching && <Preloader />}
        </>
    )
}