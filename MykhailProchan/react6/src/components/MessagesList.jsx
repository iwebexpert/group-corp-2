import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Message, messageType } from './Message';

export function MessagesList(props) {
	const temp = props.items.map((item, index) => (<Message text={item.text} author={item.author} key={index} />))
	return temp.reverse()
}

MessagesList.propTypes = {
	items: PropTypes.arrayOf(messageType),
}