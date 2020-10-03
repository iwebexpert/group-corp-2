import React, { useEffect } from 'react'
import { LayoutHeader } from './LayoutHeader';
import { ChatList } from './ChatList';
import { ChatForm } from './ChatForm';

export const Layout = ({ chats, match, updateChats }) => {
    let time = null;

    const getNeedChats = () => {
        const id = match.params.id;
        return chats.find(el => el.id == id);
    }

    const addNewMessage = (mess) => {
        updateChats(mess, match.params.id);
        clearTimeout(time)
    }

    useEffect(() => {
        if (getNeedChats().messages.length) {
            const { title, image } = getNeedChats();
            const { author } = getNeedChats().messages[getNeedChats().messages.length - 1];
            if (author !== title) {
                time = setTimeout(() => {
                    addNewMessage({ author: title, message: `${author} - Hi!!!`, image });
                }, 4000)
            }
        }
    }, [chats])

    return (
        <>
            <LayoutHeader chat={getNeedChats()} />
            <ChatList chats={getNeedChats()} />
            <ChatForm onSendMessage={addNewMessage} />
        </>
    )
}
