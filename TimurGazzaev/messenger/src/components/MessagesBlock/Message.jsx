import React from 'react'
import PropTypes from 'prop-types'
import CloseIcon from '@material-ui/icons/Close'

export const messageType = {
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}

export const Message = ({id, text, author, time, handleDeleteMessage, classes}) => {
    return (
        <div id={id} className={author === 'Timur' ? 'message' : 'message bot'}>
            <div className="author">{author}</div>
            <div className="messageText">
                {text}
                <CloseIcon className={classes.closeIcon} onClick={() => handleDeleteMessage(id)}/>
            </div>
            <div className="time">{time}</div>
        </div>
    )
}

Message.propTypes = messageType
