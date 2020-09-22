import React from 'react';
import Message from './Message/Message';

const Messages = (props) => {
	let messages = props.messages.map((m, index) => <Message key={index} text={m.message} author={m.author}/>)
	return (
		<>
			{messages}
		</>
	)
}

export default Messages;