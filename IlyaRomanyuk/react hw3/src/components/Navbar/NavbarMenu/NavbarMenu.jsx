import React from 'react';
import { Link } from "react-router-dom";

export const NavbarMenu = () => {
    return (
        <div className="navbar__links">
            <Link to="/" >Home</Link>
            <Link to="/profile" >Profile</Link>
        </div>
    )
}
