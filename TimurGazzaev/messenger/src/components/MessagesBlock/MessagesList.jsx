import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {Message, messageType} from './Message'

export const MessagesList = ({messages}) => {

    useEffect(() => {
        messages && messages.length && document.getElementById((messages.length - 1).toString()).scrollIntoView()
    })

    return <div className="messagesList">
        {messages && messages.length
            ? messages.map((item, index) => (
            <Message id={index} author={item.author} text={item.text} time={item.time} key={index} />
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
