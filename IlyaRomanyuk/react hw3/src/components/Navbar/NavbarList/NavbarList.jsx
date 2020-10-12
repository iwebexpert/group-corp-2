import React from 'react';
import { NavbarItem } from './NavbarItem';

export const NavbarList = ({ list, deleteChatAction, redirectOnHome }) => {
    return (
        <div className="navbar__list">
            {Object.values(list).map((obj, index) => <NavbarItem key={index} deleteChatAction={deleteChatAction} {...obj} />)}
        </div>
    )
}

