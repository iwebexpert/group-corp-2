import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import url from '../../img/userLogo.png';

const Header = () => {
  const author = useSelector((state) => state.profile.profileEntries.author);
  return (
    <header className="header">
      <Link to="/">
        <h1>
          <span className="messengerText">Messenger</span> App
        </h1>
      </Link>
      <nav>
        <li>
          <NavLink to="/" activeClassName="active" exact>
            Главная
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" activeClassName="active">
            О нас
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" activeClassName="active">
            <p>{author}</p>
            <img src={url} alt="лого" />
          </NavLink>
        </li>
      </nav>
    </header>
  );
};

export default Header;
