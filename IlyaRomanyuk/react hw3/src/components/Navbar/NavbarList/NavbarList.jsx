import React, { useState } from 'react';
import { NavbarItem } from './NavbarItem';

export const NavbarList = ({ list }) => {
    return (
        <div className="navbar__list">
            {list.map((obj, index) => <NavbarItem key={index} {...obj} />)}
        </div>
    )
}

