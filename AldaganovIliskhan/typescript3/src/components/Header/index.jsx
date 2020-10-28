import React from 'react'

import PersonIcon from '@material-ui/icons/Person';
import './Header.scss'
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import classNames from 'classnames'
export const Header = ({ active, setActiveChat }) => {
    const { profileData, isProfileLoading, isProfileError } = useSelector(({ profile }) => profile);

    return (
        <header className="header">
            <Link to="/" className={classNames(!active ? 'active' : '', 'header-btn')} onClick={() => setActiveChat(false)}>Главная</Link>
            {
                isProfileError ? <div>Error...</div> :
                    isProfileLoading ? <div>Loading...</div> : <h1>{profileData && profileData.nickname}</h1>
            }

            <Link to="/profile"><PersonIcon /></Link>
        </header>
    )
}

