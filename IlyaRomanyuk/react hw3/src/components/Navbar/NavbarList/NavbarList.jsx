import React from 'react';
import { NavbarItem } from './NavbarItem';
import { Preloader } from '../../Preloader';

export const NavbarList = ({ list, deleteChatAction, loadingData }) => {

    if (loadingData) {
        return <Preloader />
    }

    return (
        <div className="navbar__list">
            {Object.values(list).map((obj, index) => <NavbarItem key={index} deleteChatAction={deleteChatAction} {...obj} />)}
        </div>
    )
}

