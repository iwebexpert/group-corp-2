import React from 'react'

import PersonIcon from '@material-ui/icons/Person';
import './Header.scss'
import { connect } from 'react-redux';
import { push } from 'connected-react-router'
import { Link } from 'react-router-dom';
import classNames from 'classnames'
const Header = ({ active, setActiveChat, isProfileLoading, isProfileError, profileData }) => {

    return (
        <header className="header">
            <Link to="/" className={classNames(!active ? 'active' : '', 'header-btn')} onClick={() => setActiveChat(false)}>Главная</Link>
            {
                isProfileError ? <div>Error...</div> :
                    isProfileLoading ? <div>Loading...</div> : <h1>{profileData && profileData.name}</h1>
            }

            <Link to="/profile"><PersonIcon /></Link>
        </header>
    )
}
const mapStateToProps = ({ profile }) => ({
    isProfileLoading: profile.isProfileLoading,
    isProfileError: profile.isProfileError,
    profileData: profile.profileData
})
export default connect(mapStateToProps, { push })(Header);