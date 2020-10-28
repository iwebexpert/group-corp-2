import React from 'react'
import { Preloader } from '../../Preloader';

type NavbarAbout = {
    person: {
        name: string,
        status: string,
        image: string
    };
    loading: boolean
}

export const NavbarAbout: React.FC<NavbarAbout> = ({ person, loading }) => {
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
