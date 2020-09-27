import React from 'react'
import PropTypes from 'prop-types'

import {Message, messageType} from './Message'

export const MessagesList = (props) => {
    return props.items.map((item, index) => (<Message author={item.author}  text={item.text} key={index} />))
}

MessagesList.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape(messageType)
    )
}
