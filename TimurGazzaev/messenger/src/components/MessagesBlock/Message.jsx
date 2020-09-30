import React from 'react'
import PropTypes from 'prop-types'

export const messageType = {
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}

export const Message = ({text, author, time}) => {
    return <div className={author === 'Бот' ? 'message bot' : 'message'}>
        <div className="author">{author}</div>
        <div className="messageText">{text}</div>
        <div className="time">{time}</div>
    </div>
}

Message.propTypes = messageType
