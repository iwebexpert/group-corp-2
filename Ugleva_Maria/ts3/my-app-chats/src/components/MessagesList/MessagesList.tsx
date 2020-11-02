import React, { useEffect } from 'react';
import Message from '../Message';
import { withStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveChat } from '../../actions/changeActiveChat';
import MessageField from '../MessageField';
import { useParams } from 'react-router-dom';
import { AppState } from '../../reducers/reducer';
import {Styles, MessageType} from '../../type';

const styles: { [key: string]: Styles } = {
	messagesList: {
		width: '100%',
		boxSizing: 'border-box',
		margin: '0 auto',
		padding: '20px 30px',
		minHeight: '200px',
	},
	messagesListItemLeft: {
		display: 'flex',
		justifyContent: 'flex-start',
		margin: '10px 0',
		textAlign: 'left',
	},
	messagesListItemRight: {
		display: 'flex',
		justifyContent: 'flex-end',
		margin: '10px 0',
		textAlign: 'right',
	},
	messagesContent: {
		backgroundColor: '#f097e7',
		padding: '7px 12px',
		borderRadius: '10px',
		display: 'flex',
		flexDirection: 'column',
	},
};
type MessagesListType = {
	classes: Styles;
};
const MessagesList: React.FC<MessagesListType> = ({ classes }) => {
	const dispatch = useDispatch();
	let { id } = useParams<{ id: string }>();
	let chatId = id.toString();
	let chatToRender = useSelector((state: AppState) => {
		let chats = [];
		for (let key in state.allChats.entries) {
			chats.push(state.allChats.entries[key]);
		}

		const chat =
			chats.length &&
			chats.find((item) => {
				return chatId === item.id;
			});
		return chat;
	});
	useEffect(() => {
		dispatch(setActiveChat(chatId));
	}, [chatId]);
	if (chatToRender) {
		return (
			<>
				<div className={classes.messagesList}>
					{chatToRender.messages.map((item: MessageType) => {
						return (
							<Message
								backCol={classes.messagesContent}
								styles={
									item.author === 'Bot' ? classes.messagesListItemLeft : classes.messagesListItemRight
								}
								data={item}
							/>
						);
					})}
				</div>
				<MessageField />
			</>
		);
	}
	return null;
};

export default withStyles(styles)(MessagesList);
