import React from "react";
import {useSelector} from 'react-redux';
import {AppState} from "../../reducers";

import {Link} from "react-router-dom";
import botImg from "../../img/user.png";
//FONTAWESOME
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {faSuperpowers} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-regular-svg-icons";
//-----------

export const Header: React.FC = () => {

    const userInfo = useSelector((state:AppState) => state.profile.entries);

    let name: string = "Loading...";
    if(userInfo){
        name = userInfo.name;
    }

    return <header>
        <div className="container">
            <div className="inner_header">
                <Link to='/chats/new' className="logo"><FontAwesomeIcon className="logo_icon" icon={faSuperpowers} />Social Messenger</Link>
                <div className="search">
                    <input type="text" className="search_input" placeholder="Поиск по сообщениям..."/>
                    <FontAwesomeIcon className="search_icon" icon={faSearch}/>
                    <FontAwesomeIcon className="search_icon search_icon__right" icon={faSearch}/>
                </div>
                <div className="user_link">
                    <div className="user_account">
                        <div className="user_account__imgLink">
                            <div className="user_account__img" style={{background: `url(${botImg}) top/cover no-repeat`}}>
                            </div>
                        </div>
                        <div className="user_wrapper">
                            <div className="user_account__info">
                                <div className="user_account__infoLink">{name}</div>
                                <div className="state state_online">
                                    <FontAwesomeIcon icon={faCircle}/>
                                    Online
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
}