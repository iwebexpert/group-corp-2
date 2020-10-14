import React, { useEffect } from 'react';
import Message from '../Message';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { setActiveChat } from '../../actions/changeActiveChat';
import MessageField from '../MessageField';

const styles = {
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

const MessagesList = (props) => {
	let { classes, chatId, setActiveChat } = props;
	useEffect(() => {
		setActiveChat(chatId);
	}, [chatId]);
	if (props.chatToRender) {
		return (
			<>
				<div className={classes.messagesList}>
					{props.chatToRender.messages.map((item) => {
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
const mapStateToProps = (state, ownProps) => {
	let chats = [];
	for (let key in state.allChats.entries) {
		chats.push(state.allChats.entries[key]);
	}
	const id = ownProps.match.params.id;
	const chat =
		chats.length &&
		chats.find((item) => {
			return id === item.id;
		});
	return {
		chatToRender: chat,
		chatId: id.toString(),
	};
};
const mapDispatchToPtops = (dispatch) => {
	return {
		setActiveChat: (id) => dispatch(setActiveChat(id)),
	};
};
export default connect(mapStateToProps, mapDispatchToPtops)(withStyles(styles)(MessagesList));
