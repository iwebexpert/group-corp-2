import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import url from '../../img/userLogo.png';

import { DefaultProfileRootState } from '../../types'

const Header: React.FC<{}> = () => {
  const author: string = useSelector((state: DefaultProfileRootState) => state.profile.profileEntries.author);
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
          <NavLink to="/about" activeClassName="active" exact>
            О нас
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" activeClassName="active">
            {/* Если загрузить не удалось -> пользователь аноним, иначе имя пользователя */}
            {/* В данном случае  undefined оправдан, так как если состояние автор не загрузилось,
             то JS вернет author равное undefined, на что я и делаю проверку*/}
            {author === undefined
              ? <><p>Аноним</p> <img src={url} alt="лого" /></>
              : <><p>{author}</p> <img src={url} alt="лого" /></>
            }

          </NavLink>
        </li>
      </nav>
    </header>
  );
};

export default Header;
