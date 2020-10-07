import React from 'react'
import { useHistory } from 'react-router-dom'

import PersonIcon from '@material-ui/icons/Person';
import './Header.scss'
export const Header = ({ active, setActiveChat }) => {
    let history = useHistory();
    const onActive = () => {
        setActiveChat(false);
        history.push('/');
    }
    return (
        <header className="header">
            <span className={!active ? 'active' : ''} onClick={() => onActive()}>Главная</span>
            <h1>THE MESSANGER</h1>
            <PersonIcon onClick={() => history.push('/profile')} />
        </header>
    )
}
