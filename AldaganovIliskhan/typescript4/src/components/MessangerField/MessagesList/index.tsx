import React from 'react'
import { useSelector } from 'react-redux'
import { MessagesType } from '../../../actions/chats'
import { AppState } from '../../../reducers';
import './MessagesList.scss'
type MessagesList = {
    messages : MessagesType[]
};
export const MessagesList : React.FC<MessagesList> = ({ messages }) => {
    const { isMessagesError, isMessagesLoading } = useSelector((state : AppState) => state.chats)
    return (
        <ul className="messages__list">
            {
                isMessagesError ? <div style={{ textAlign: 'center' }}>Error...</div> :
                    isMessagesLoading ? <div style={{ textAlign: 'center' }}>Loading...</div> :
                        messages && messages.length ? messages.map((item, i) => <li key={i + 1} className={item.author === "Bot" ? 'bot' : 'sender'}><small>Сообщение</small> - {item.message}, <small>Автор</small> - {item.author}</li>) : null
            }
        </ul>
    )
}
