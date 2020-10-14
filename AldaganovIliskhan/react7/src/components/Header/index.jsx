import React from 'react'
import { useHistory } from 'react-router-dom'

import PersonIcon from '@material-ui/icons/Person';
import './Header.scss'
import { connect } from 'react-redux';
const Header = ({ active, setActiveChat, isProfileLoading, isProfileError, profileData }) => {
    let history = useHistory();
    const onActive = () => {
        setActiveChat(false);
        history.push('/');
    }
    if (isProfileError) {
        return <div style={{ color: '#000' }}>Error...</div>
    }
    if (isProfileLoading) {
        return <div style={{ color: '#000' }}>Loading...</div>
    }
    return (
        <header className="header">
            <span className={!active ? 'active' : ''} onClick={() => onActive()}>Главная</span>
            <h1>{profileData && profileData.name}</h1>
            <PersonIcon onClick={() => history.push('/profile')} />
        </header>
    )
}
const mapStateToProps = ({ profile }) => ({
    isProfileLoading: profile.isProfileLoading,
    isProfileError: profile.isProfileError,
    profileData: profile.profileData
})
export default connect(mapStateToProps)(Header);