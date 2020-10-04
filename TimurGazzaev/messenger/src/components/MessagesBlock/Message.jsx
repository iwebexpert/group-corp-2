import React from 'react'
import PropTypes from 'prop-types'

export const messageType = {
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}

export const Message = ({id, text, author, time}) => {
    return <div id={id} className={author === 'Timur' ? 'message' : 'message bot'}>
        <div className="author">{author}</div>
        <div className="messageText">{text}</div>
        <div className="time">{time}</div>
    </div>
}

Message.propTypes = messageType
