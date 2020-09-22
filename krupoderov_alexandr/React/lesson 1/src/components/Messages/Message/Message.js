import React from 'react';

const Message = ({author, text}) => {
	return (
		<div>
			<strong>{author}</strong> - {text}
		</div>
	)
}

export default Message;