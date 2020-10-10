import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import url from '../../img/userLogo.png';
import { push } from 'connected-react-router'

const Header = () => {
  const author = useSelector((state) => state.profile.profileEntries.author);
  const dispatch = useDispatch();
  const handlerPush = () => {
    dispatch(push('/about'))
  }
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
          <div onClick={handlerPush}> {/*Переход на страницу о нас с использованием push*/}
            О нас
          </div>
          {/* <NavLink to="/about" activeClassName="active" exact>
            О нас
          </NavLink> */}
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
