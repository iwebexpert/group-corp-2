import React from 'react';
import { NavbarItem } from './NavbarItem';

export const NavbarList = ({ list }) => {
    return (
        <div className="navbar__list">
            {Object.values(list).map((obj, index) => <NavbarItem key={index} {...obj} />)}
        </div>
    )
}

