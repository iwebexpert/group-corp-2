import React from 'react';



export const LayoutHeader = ({ chat, cleanAllMessagesAction }) => {

    const cleanAllMessages = (id) => {
        cleanAllMessagesAction(id)
    }

    return (
        <>
            {chat && <div className="content__header  header">
                <div className="navbar__about--head">
                    <div className="navbar__img"><img src={chat.image} alt="" /></div>

                    <div className="navbar__info">
                        <p className="navbar__info-name--color">{chat.title}</p>
                        <span className="navbar__info-mess">Available for freelance work.</span>
                    </div>
                </div>
                {chat.messages ? <button onClick={() => cleanAllMessages(chat.id)} className="wrapper__clean">Очистить все</button> : ''}
            </div>}
        </>
    )
}
