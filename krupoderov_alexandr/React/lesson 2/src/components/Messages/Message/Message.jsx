import React from 'react';

const Message = (props) => {
	return (
		<div><strong>{props.author}</strong> - {props.text}</div>
	)
};

export default Message;