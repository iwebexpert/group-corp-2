import React from 'react'
import m1 from './../../../img/mans/m1.png';

export const NavbarAbout = () => {
    return (
        <div className="navbar__about">
            <div className="navbar__img"><img src={m1} alt="" /></div>

            <div className="navbar__info">
                <p className="navbar__info-name">Rafael Ramaisen</p>
                <span className="navbar__info-mess">Available for freelance work.</span>
            </div>
        </div>
    )
}
