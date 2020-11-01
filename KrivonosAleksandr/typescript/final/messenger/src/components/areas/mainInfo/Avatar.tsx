import React from "react";

import botImg from '../../../img/user.png';

//FONTAWESOME
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
//-----------

const Avatar: React.FC<{}> = () => {
    return <div className="avatar">
        <img src={botImg} className="avatar-img" alt="userAva"/>
        <div className="avatar-btns">
            <button className="avatar-btns--edit">Редактировать</button>
            <button className="avatar-btns--more"><FontAwesomeIcon icon={faEllipsisV}/></button>
        </div>
    </div>
}

export default Avatar;