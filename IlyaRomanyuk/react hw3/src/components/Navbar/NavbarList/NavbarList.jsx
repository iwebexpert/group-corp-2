import React, { useEffect, useRef } from 'react';
import { NavbarItem } from './NavbarItem';

export const NavbarList = ({ list }) => {
    return (
        <div ref={scroll} className="navbar__list">
            {list.map((obj, index) => <NavbarItem key={index} {...obj} />)}
        </div>
    )
}

