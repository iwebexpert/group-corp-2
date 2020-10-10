import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {Message, messageType} from './Message'

export const MessagesList = ({messages, handleDeleteMessage, classes}) => {

    useEffect(() => {
        messages && messages.length && document.getElementById((messages[messages.length-1].id).toString()).scrollIntoView()
    })

    return <div className="messagesList">
        {messages && messages.length
            ? messages.map((item, index) => (
            <Message handleDeleteMessage={handleDeleteMessage} id={item.id} author={item.author} text={item.text} time={item.time} key={item.id} classes={classes}/>
            ))
            : <div className="emptyMessageBlock">There are no messages. Start chat.</div>
        }
    </div>
}

MessagesList.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape(messageType)
    )
}
