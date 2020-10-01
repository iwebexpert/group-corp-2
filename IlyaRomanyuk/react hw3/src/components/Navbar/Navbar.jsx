import React, { useState } from 'react'
import { NavbarList } from './NavbarList';
import { NavbarSearch } from './NavbarSearch';
import { NavbarAbout } from './NavbarAbout';
import m2 from './../../img/mans/m2.png';
import m3 from './../../img/mans/m3.png';
import m4 from './../../img/mans/m4.png';
import m5 from './../../img/mans/m5.png';

export const Navbar = () => {
    const dataList = [
        { name: 'Manuel Preuß', mess: 'Hey Rafael! Can we talk about last', image: m2 },
        { name: 'Dmitry Shirshov', mess: 'Can you invite me to your conversat', image: m3 },
        { name: 'Helga Källström', mess: 'I’m very happy to introduce it!', image: m4 },
        { name: 'Hugh Reynolds', mess: 'Sup bro! Can you call me pls?', image: m5 }
    ]

    const [list, setList] = useState(dataList);

    const findNeedChat = (chat) => {
        var regexp = new RegExp(chat.toLowerCase(), "gi");
        let newList = dataList.filter(el => {
            if (el.name.toLowerCase().match(regexp)) {
                return el
            }
        });

        setList(newList);
    }

    return (
        <>
            <NavbarAbout />
            <NavbarSearch findNeedChat={findNeedChat} />
            <NavbarList list={list} />
        </>
    )
}
