import React, {useEffect} from 'react'
import PropTypes from 'prop-types'

import {Message, messageType} from './Message'

export const MessagesList = (props) => {

    useEffect(() => {
        props.items.length && document.getElementById((props.items.length - 1).toString()).scrollIntoView()
    })

    return <div className="messagesList">
        {props.items.length
            ? props.items.map((item, index) => (
            <Message id={index} author={item.author} text={item.text} time={item.time} key={index} />
            ))
            : <div>There are no messages yet</div>
        }
    </div>
}

MessagesList.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape(messageType)
    )
}
