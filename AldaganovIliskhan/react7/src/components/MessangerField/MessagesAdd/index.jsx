import React from 'react'

import MessagesList from '../MessagesList';
import './MessagesAdd.scss'
import { MessangerForm } from '../MessangerForm';
import { connect } from 'react-redux';
const MessagesAdd = ({ messages, chat, chats, sendMessageAction, pathname }) => {
    return (
        <div className="messages__add">
            <MessagesList messages={messages} />
            {
                pathname !== '/' ? < MessangerForm sendMessageAction={sendMessageAction} chat={chat} chats={chats} /> : <div style={{ position: 'absolute', top: '150px', left: '50%' }}>Выберите чат</div>
            }
        </div>
    )
}
const mapStateToProps = (state) => ({
    pathname: state.router.location.pathname
})
export default connect(mapStateToProps)(MessagesAdd)