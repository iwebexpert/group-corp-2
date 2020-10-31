import React from 'react'

import PersonIcon from '@material-ui/icons/Person';
import './Header.scss'
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import classNames from 'classnames'
type HeaderTYpe = {
    active : boolean,
}
export const Header  : React.FC<HeaderTYpe> = ({ active }) => {
    const { profileData, isProfileLoading, isProfileError } = useSelector((state : any) => state.profile);

    return (
        <header className="header">
            <Link to="/" className={classNames(!active ? 'active' : '', 'header-btn')}>Главная</Link>
            {
                isProfileError ? <div>Error...</div> :
                    isProfileLoading ? <div>Loading...</div> : <h1>{profileData && profileData.nickname}</h1>
            }

            <Link to="/profile"><PersonIcon /></Link>
        </header>
    )
}

