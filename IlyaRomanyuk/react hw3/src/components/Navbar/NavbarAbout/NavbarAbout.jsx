import React from 'react'
import { Preloader } from '../../Preloader';

export const NavbarAbout = ({ person, loading }) => {
    if (loading) {
        return <Preloader />
    }

    return (
        <div className="navbar__about">
            <div className="navbar__img"><img src={person.image} alt="" /></div>

            <div className="navbar__info">
                <p className="navbar__info-name">{person.name}</p>
                <span className="navbar__info-mess">{person.status}</span>
            </div>
        </div>
    )
}
