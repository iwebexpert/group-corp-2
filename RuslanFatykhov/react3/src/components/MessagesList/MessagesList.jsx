import React from 'react';
import PropTypes from 'prop-types';

import {Message, messageType} from '../Message';

export const MessagesList = (props) => {
    return props.items.map((item) => (<Message {...item} key={item.id} />));
};

MessagesList.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape(messageType),
    ),
};