import React from 'react';
import { Link } from "react-router-dom";

export const NavbarMenu = ({ redirectOnHome }) => {
    const redirectWithPush = () => redirectOnHome()

    return (
        <div className="navbar__links">
            {/* <Link to="/" >Home</Link> */}
            <div className="navbar__myLink" onClick={redirectWithPush}>Home</div>
            <Link to="/profile" >Profile</Link>
        </div>
    )
}
