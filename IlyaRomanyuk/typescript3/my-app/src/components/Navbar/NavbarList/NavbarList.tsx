import React from 'react';
import { NavbarItem } from './NavbarItem';
import { Preloader } from '../../Preloader';

type NavbarItemMessage = {
    id: number | string;
    author: string;
    message: string;
    image: string;
    chatId: number;
};

type NavbarListChat = {
    id: number;
    title: string;
    fire: boolean;
    image: string;
    messages: Array<NavbarItemMessage>
}

type NavbarList = {
    list: Array<NavbarListChat>
    deleteChatAction: (id: number) => void;
    loadingData: boolean;
}

export const NavbarList: React.FC<NavbarList> = ({ list, deleteChatAction, loadingData }) => {

    if (loadingData) {
        return <Preloader />
    }

    console.log(list, deleteChatAction, loadingData)

    return (
        <div className="navbar__list">
            {Object.values(list).map((obj, index) => <NavbarItem key={index} deleteChatAction={deleteChatAction} {...obj} />)}
        </div>
    )
}

