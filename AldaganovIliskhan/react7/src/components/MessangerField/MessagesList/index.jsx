import React from 'react'
import { connect } from 'react-redux'
import './MessagesList.scss'
const MessagesList = ({ messages, isMessagesError, isMessagesLoading }) => {
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
const mapStateToProps = ({ chats }) => ({
    isMessagesError: chats.isMessagesError,
    isMessagesLoading: chats.isMessagesLoading
})
export default connect(mapStateToProps)(MessagesList);