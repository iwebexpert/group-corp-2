import React from 'react';
import { Message } from './Message';

type MessagesListProps = {
	items: MessageType[]
}

export const MessagesList: React.FC<MessagesListProps> = (props) => {
	const temp = props.items.map((item, index) => (<Message text={item.text} author={item.author} key={index} />))
	return <>{temp.reverse()}</>
}