import React from "react";

export default function ({user}) {
    return (
        <div>
        {
            user ?
                <div className="PreferencesWindowCard">
                    <div className={"primaryHeader"}>Профиль пользователя</div>
                    <div className="profileCardInfo">
                        <div style={{gridArea: '2 / 2 / 10 / 10'}} className="avatarAbsolute">{user.avatarUrl ? <img src={user.avatarUrl} alt={'Аватар'}/> : user.name.slice(0,2)}</div>
                        <div style={{gridArea: '2 / 10 / 4 / 15'}} className={"infoText"}>Имя</div>
                        <div style={{gridArea: '4 / 10 / 6 / 15'}} className={"infoText"}>Возраст</div>
                        <div style={{gridArea: '6 / 10 / 8 / 15'}} className={"infoText"}>Пол</div>
                        <div style={{gridArea:'2 / 25 / 4 / 30'}} className={"infoText"}>{user.name}</div>
                        <div style={{gridArea:'4 / 25 / 6 / 30'}} className={"infoText"}>{user.age}</div>
                        <div style={{gridArea:'6 / 25 / 8 / 30'}} className={"infoText"}>{user.sex}</div>
                    </div>
                </div>
                : null
        }
        </div>
    );
}
