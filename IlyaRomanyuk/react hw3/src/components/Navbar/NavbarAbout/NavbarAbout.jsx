import React from 'react'

export const NavbarAbout = ({ person }) => {
    return (
        <div className="navbar__about">
            <div className="navbar__img"><img src={person.image} alt="" /></div>

            <div className="navbar__info">
                <p className="navbar__info-name">{person.title}</p>
                <span className="navbar__info-mess">{person.status}</span>
            </div>
        </div>
    )
}
