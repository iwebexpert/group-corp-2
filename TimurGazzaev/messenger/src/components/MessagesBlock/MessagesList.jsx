import React from 'react'
import PropTypes from 'prop-types'

import {Message, messageType} from './Message'

export const MessagesList = (props) => {
    return <div className="messagesList">
        { props.items.map((item, index) => (
            <Message author={item.author} text={item.text} time={item.time} key={index} />
            ))}
    </div>
}

MessagesList.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape(messageType)
    )
}
