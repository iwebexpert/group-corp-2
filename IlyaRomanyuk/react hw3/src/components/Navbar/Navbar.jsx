import React, { useState, useEffect } from 'react'
import { NavbarList } from './NavbarList';
import { NavbarSearch } from './NavbarSearch';
import { NavbarAbout } from './NavbarAbout';
import { NavbarMenu } from './NavbarMenu';
import { NavbarForm } from './NavbarForm'


export const Navbar = ({ dataList, addNewChat }) => {
    const [list, setList] = useState(dataList);

    useEffect(() => {
        setList(dataList)
    }, [dataList])

    const findNeedChat = (chat) => {
        var regexp = new RegExp(chat.toLowerCase(), "gi");
        let newList = dataList.filter(el => {
            if (el.title.toLowerCase().match(regexp)) {
                return el
            }
        });
        setList(newList);
    }

    return (
        <>
            <NavbarMenu />
            <NavbarAbout />
            <NavbarSearch findNeedChat={findNeedChat} />
            <NavbarList list={list} />
            <NavbarForm addNewChat={addNewChat} />
        </>
    )
}
