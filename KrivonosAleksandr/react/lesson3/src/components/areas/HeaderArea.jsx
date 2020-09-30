import React from "react";
//FONTAWESOME
import {faSearch, faComment, faBell, faCog} from '@fortawesome/free-solid-svg-icons';
import {faSuperpowers} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
//-----------

const Header = () => {
    return <header>
        <div className="container">
            <div className="inner_header">
                <a href="/#" className="logo"><FontAwesomeIcon className="logo_icon" icon={faSuperpowers} />Social Messenger</a>
                <div className="search">
                    <input type="text" className="search_input" placeholder="Поиск по сообщениям..."/>
                    <FontAwesomeIcon className="search_icon" icon={faSearch}/>
                    <FontAwesomeIcon className="search_icon search_icon__right" icon={faSearch}/>
                </div>
            </div>
        </div>
    </header>
}

export default Header;