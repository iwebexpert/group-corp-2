import React from 'react';
import { Link } from 'react-router-dom';


type NavbarItemMessage = {
    id: number | string;
    author: string;
    message: string;
    image: string;
    chatId: number;
};

type NavbarItem = {
    id: number;
    image: string;
    messages: Array<NavbarItemMessage>
    title: string;
    fire: boolean;
    deleteChatAction: (id: number) => void;
};

export const NavbarItem: React.FC<NavbarItem> = ({ id, image, messages, title, fire, deleteChatAction }) => {
    const deleteChat = (id: number) => {
        deleteChatAction(id)
    }

    return (
        <div className="navbar__block">
            <Link to={`/chats/${id}`} className="navbar__link" >
                <div className="navbar__about">
                    <div className="navbar__img"><img src={image} alt="" /></div>
                    <div className="navbar__info">
                        <p className="navbar__info-name">{title}</p>
                        {messages && <span className="navbar__info-mess">{messages[messages.length - 1] ? messages[messages.length - 1].message : "Пока сообщений нет"}</span>}
                    </div>
                    {fire && <div className="wrapper__fire"></div>}

                </div>
            </Link >
            <div onClick={() => deleteChat(id)} className="navbar__delete">+</div>
        </div>
    )
}
