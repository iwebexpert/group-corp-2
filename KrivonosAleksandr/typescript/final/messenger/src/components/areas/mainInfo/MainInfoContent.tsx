import React from "react";
import {Link} from "react-router-dom";

//FONTAWESOME
import {faCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
//-----------

type userType = {
    userInfo: profilePayload[];
}

const MainInfoContent: React.FC<userType> = (props) => {
    let name = '';
    let birthDate = '';
    let city = '';
    let education = '';
    let webSite = '';
    let friends = 0;
    let subscribers = 0;
    let photos = 0;
    let marks = 0;
    let videos = 0;
    if(props.userInfo && props.userInfo.length) {
        name = props.userInfo[0].name;
        birthDate = props.userInfo[0].birthDate;
        city = props.userInfo[0].city;
        education = props.userInfo[0].education;
        webSite = props.userInfo[0].webSite;
        friends = props.userInfo[0].friends;
        subscribers = props.userInfo[0].subscribers;
        photos = props.userInfo[0].photos;
        marks = props.userInfo[0].marks;
        videos = props.userInfo[0].videos;
    }

    return <div className="main-info--content">
        <div className="main-info--top">
            <div>
                <h1 className="main-info--name">{name}</h1>
                <Link to="/profile," className="main-info--status">изменить статус</Link>
            </div>
            <div className="state state-online">
                <FontAwesomeIcon icon={faCircle}/>
                Online
            </div>
        </div>
        <div>
            <div className="user-info">
                <div className="user-info--content birthdate">
                    <div className="user-info--text birthdate-text">День рождения:</div>
                    <div className="user-info--link">
                        <Link to="/profile" className="user-info--value birthdate-value">{birthDate}</Link>
                    </div>
                </div>
                <div className="user-info--content city">
                    <div className="user-info--text city-text">Город:</div>
                    <div className="user-info--link">
                        <Link to="/profile" className="user-info--value city-value">{city}</Link>
                    </div>
                </div>
                <div className="user-info--content education">
                    <div className="user-info--text education-text">Образование:</div>
                    <div className="user-info--link">
                        <Link to="/profile" className="user-info--value education-value">{education}</Link>
                    </div>
                </div>
                <div className="user-info--content website">
                    <div className="user-info--text website-text">Веб-сайт:</div>
                    <div className="user-info--link">
                        <Link to="https://some-site"
                              className="user-info--value website-value">{webSite}</Link>
                    </div>
                </div>
            </div>
            <hr/>
            <div className="user-stats">
                <div className="user-stats--item">
                    <Link to="/profile" className="user-stats--value">{friends}</Link>
                    <div className="user-stats--name">друзей</div>
                </div>
                <div className="user-stats--item">
                    <Link to="/profile" className="user-stats--value">{subscribers}</Link>
                    <div className="user-stats--name">подписчиков</div>
                </div>
                <div className="user-stats--item">
                    <Link to="/profile" className="user-stats--value">{photos}</Link>
                    <div className="user-stats--name">фотографий</div>
                </div>
                <div className="user-stats--item">
                    <Link to="/profile" className="user-stats--value">{marks}</Link>
                    <div className="user-stats--name">отметка</div>
                </div>
                <div className="user-stats--item">
                    <Link to="/profile" className="user-stats--value">{videos}</Link>
                    <div className="user-stats--name">видео</div>
                </div>
            </div>
        </div>
    </div>
}

export default MainInfoContent;