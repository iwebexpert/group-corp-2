import React from 'react'
import './MessagesList.scss'
export const MessagesList = ({ messages }) => {
    return (
        <ul className="messages__list">
            {
                messages && messages.length ? messages.map((item, i) => <li key={i + 1} className={item.author === "Bot" ? 'bot' : 'sender'}><small>Сообщение</small> - {item.message}, <small>Автор</small> - {item.author}</li>) : null
            }
        </ul>
    )
}
