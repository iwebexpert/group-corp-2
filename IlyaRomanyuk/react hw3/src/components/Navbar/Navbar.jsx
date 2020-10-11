import React, { useState, useEffect } from 'react'
import { NavbarList } from './NavbarList';
import { NavbarSearch } from './NavbarSearch';
import { NavbarAbout } from './NavbarAbout';
import { NavbarMenu } from './NavbarMenu';
import { NavbarForm } from './NavbarForm'


export const Navbar = ({ chats, addNewChat, person, redirectOnHome, deleteChatAction }) => {
    const [list, setList] = useState(chats);

    useEffect(() => {
        setList(chats)
    }, [chats])

    const findNeedChat = (chat) => {
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
            <NavbarMenu redirectOnHome={redirectOnHome} />
            <NavbarAbout person={person} />
            <NavbarSearch findNeedChat={findNeedChat} />
            <NavbarList deleteChatAction={deleteChatAction} list={list} person={person} />
            <NavbarForm addNewChat={addNewChat} />
        </>
    )
}
