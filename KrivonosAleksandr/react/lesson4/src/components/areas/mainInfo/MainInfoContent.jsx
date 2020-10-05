import React from "react";
//FONTAWESOME
import {faCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
//-----------

const MainInfoContent = () => {
    return <div className="main-info--content">
        <div className="main-info--top">
            <div>
                <h1 className="main-info--name">New user</h1>
                <a href="/#" className="main-info--status">изменить статус</a>
            </div>
            <div className="state state-online">
                <FontAwesomeIcon icon={faCircle} />
                Online
            </div>
        </div>
        <div>
            <div className="user-info">
                <div className="user-info--content birthdate">
                    <div className="user-info--text birthdate-text">День рождения:</div>
                    <div className="user-info--link">
                        <a href="/#" className="user-info--value birthdate-value">01.04.1989</a>
                    </div>
                </div>
                <div className="user-info--content city">
                    <div className="user-info--text city-text">Город:</div>
                    <div className="user-info--link">
                        <a href="/#" className="user-info--value city-value">Москва</a>
                    </div>
                </div>
                <div className="user-info--content education">
                    <div className="user-info--text education-text">Образование:</div>
                    <div className="user-info--link">
                        <a href="/#" className="user-info--value education-value">МГУ</a>
                    </div>
                </div>
                <div className="user-info--content website">
                    <div className="user-info--text website-text">Веб-сайт:</div>
                    <div className="user-info--link">
                        <a href="https://titankuzmich.github.io/"
                           className="user-info--value website-value">https://some-site</a>
                    </div>
                </div>
            </div>
            <hr />
            <div className="user-stats">
                <div className="user-stats--item">
                    <a href="/#" className="user-stats--value">255</a>
                    <div className="user-stats--name">друзей</div>
                </div>
                <div className="user-stats--item">
                    <a href="/#" className="user-stats--value">53</a>
                    <div className="user-stats--name">подписчиков</div>
                </div>
                <div className="user-stats--item">
                    <a href="/#" className="user-stats--value">15</a>
                    <div className="user-stats--name">фотографий</div>
                </div>
                <div className="user-stats--item">
                    <a href="/#" className="user-stats--value">52</a>
                    <div className="user-stats--name">отметка</div>
                </div>
                <div className="user-stats--item">
                    <a href="/#" className="user-stats--value">35</a>
                    <div className="user-stats--name">видео</div>
                </div>
            </div>
        </div>
    </div>
}

export default MainInfoContent;