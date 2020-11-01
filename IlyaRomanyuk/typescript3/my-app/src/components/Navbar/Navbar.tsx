import React, { useState, useEffect } from 'react'
import { NavbarList } from './NavbarList';
import { NavbarSearch } from './NavbarSearch';
import { NavbarAbout } from './NavbarAbout';
import { NavbarMenu } from './NavbarMenu';
import { NavbarForm } from './NavbarForm';

type NavbarProps = {
    chats: Array<NavbarListChat>,
    loading: boolean,
    loadingData: boolean,
    person: {
        name: string,
        status: string,
        image: string
    },
    deleteChatAction: (id: number) => void,
    addNewChat: (value: string) => void
};


export const Navbar: React.FC<NavbarProps> = ({ chats, addNewChat, person, deleteChatAction, loading, loadingData }) => {
    const [list, setList] = useState(chats);

    useEffect(() => {
        setList(chats)
    }, [chats])

    const findNeedChat = (chat: string) => {
        var regexp = new RegExp(chat.toLowerCase(), "gi");
        let newList = Object.values(chats).filter(el => {
            if (el.title.toLowerCase().match(regexp)) {
                return el
            }
        });
        setList(newList);
    }

    return (
        <>
            <NavbarMenu />
            <NavbarAbout person={person} loading={loading} />
            <NavbarSearch findNeedChat={findNeedChat} />
            <NavbarList loadingData={loadingData} deleteChatAction={deleteChatAction} list={list} />
            <NavbarForm addNewChat={addNewChat} />
        </>
    )
}
