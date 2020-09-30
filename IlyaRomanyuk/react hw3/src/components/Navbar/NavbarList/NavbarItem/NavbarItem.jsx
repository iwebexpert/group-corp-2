import React from 'react'

export const NavbarItem = ({ name, mess, image }) => {
    return (
        <div className="navbar__about">
            <div className="navbar__img"><img src={image} alt="" /></div>

            <div className="navbar__info">
                <p className="navbar__info-name">{name}</p>
                <span className="navbar__info-mess">{mess}</span>
            </div>
        </div>
    )
}
