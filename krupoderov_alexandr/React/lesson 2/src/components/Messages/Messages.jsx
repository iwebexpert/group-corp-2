import React from 'react';
import Message from './Message/Message';

class Messages extends React.PureComponent{
	render() {
		let messagesArray = this.props.messages.map((m, index) => <Message key={index} text={m.message} author={m.author}/>)
		return (
			<div>
				{messagesArray}
			</div>
		);
	};
}

export default Messages;