import React from 'react';
import Message from "./Message/Message";
import TextHelper from '../../pages/TextHelper';
import { makeStyles } from '@material-ui/core/styles';
import { MessageType } from '../../types';

const useStyle = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: '#1a2236',
		width: '100%',
		alignItems: 'flex-end'
	}
});

export type MessagesProps = {
	messages: Array<MessageType>,
	photoUrl: string
};

export const Messages: React.FC<MessagesProps> = ({messages, photoUrl}) => {
	let messagesArray = [];
	const classes = useStyle();
	if (messages.length > 0) {
		for (let i = messages.length - 1; i >= 0; i--) {
			let {id, text, author}:MessageType = messages[i];
			messagesArray.unshift(<Message key={id}
										   id={id}
										   text={text}
										   photoUrl={photoUrl}
										   author={author}
			/>)
		}
	}
	return (
		<div className={classes.root}>
			{messagesArray.length === 0
				? <TextHelper text='Нет сообщений'/>
				: messagesArray
			}
		</div>
	);
};