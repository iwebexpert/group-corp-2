import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Message, messageType } from './Message';
const style = {
	overflowY: 'scroll',
	display: 'flex',
	flexDirection: 'column-reverse',
	height: '100%'
}

export function MessagesList(props) {
	const temp = props.items.map((item, index) => (<Message text={item.text} author={item.author} key={index} />))
	return (
		<div
			style={style}>
			{temp.reverse()}
		</div>
	)
}

MessagesList.propTypes = {
	items: PropTypes.arrayOf(messageType),
}