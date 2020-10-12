import React from 'react';
import { Link } from 'react-router-dom';

export const NavbarItem = ({ id, image, messages, title, fire, deleteChatAction }) => {

    const deleteChat = (id) => {
        deleteChatAction(id)
    }

    return (
        <div className="navbar__block">
            <Link to={`/chats/${id}`} className="navbar__link" >
                <div className="navbar__about">
                    <div className="navbar__img"><img src={image} alt="" /></div>
                    <div className="navbar__info">
                        <p className="navbar__info-name">{title}</p>
                        {messages.length ? <span className="navbar__info-mess">{messages[messages.length - 1].message}</span> : ''}
                        {!messages.length && <span className="navbar__info-mess">Пока сообщений нет</span>}
                    </div>
                    {fire && <div className="wrapper__fire"></div>}

                </div>
            </Link >
            <div onClick={() => deleteChat(id)} className="navbar__delete">+</div>
        </div>
    )
}
