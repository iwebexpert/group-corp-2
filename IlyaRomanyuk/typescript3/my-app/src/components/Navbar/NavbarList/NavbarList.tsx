import React from 'react';
import { NavbarItem } from './NavbarItem';
import { Preloader } from '../../Preloader';

type NavbarList = {
    list: Array<NavbarListChat>
    deleteChatAction: (id: number) => void;
    loadingData: boolean;
}

export const NavbarList: React.FC<NavbarList> = ({ list, deleteChatAction, loadingData }) => {

    if (loadingData) {
        return <Preloader />
    }

    return (
        <div className="navbar__list">
            {Object.values(list).map((obj, index) => <NavbarItem key={index} deleteChatAction={deleteChatAction} {...obj} />)}
        </div>
    )
}

