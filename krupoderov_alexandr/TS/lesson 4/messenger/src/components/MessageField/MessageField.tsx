import React, { useEffect, useRef, useState } from 'react';
import { Messages } from '../Messages/Messages';
import {Button} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import scrollbar from './Scrollbar.module.css';
import inputArea from './MessageField.module.css';
import SendIcon from '@material-ui/icons/Send';
import Preloader from '../Common/Preloader/Preloader';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import {addMessageThunkCreator} from '../../store/actions/chats';
import {IChatType} from '../../types';
import {AppState} from '../../store/store';

const useStyle = makeStyles({
	root: {
		backgroundColor: '#1a2236',
		height: '100%',
		maxWidth: '100%',
		position: 'relative'
	},
	messages: {
		maxWidth: '100%',
		minHeight: '75vh',
		maxHeight: '75vh',
		overflowY: 'scroll',
	},
	error: {
		marginTop: '32px',
		color: 'white',
		fontSize: '24px'
	},
});

type MessageFieldProps = {
	chat: IChatType
};

export const MessageField: React.FC<MessageFieldProps> = ({chat}) => {
	const [messageText, setMessageText] = useState('');
	const [author, photoUrl, chatsError, isSending] = useSelector((state:AppState ) => [
		state.profile.author,
		state.profile.photoUrl,
		state.chats.chatsError,
		state.chats.isSending
	]);
	const dispatch = useDispatch();
	const messagesEndRef = useRef<HTMLDivElement | null>(null);

	const sendMessage = () => {
		if (!messageText) {
			alert('Введите текст сообщения');
			return;
		}
		if (!author) {
			alert('Введите имя автора в настройках');
			return;
		}
		dispatch(addMessageThunkCreator(chat.id, author.toString(), messageText));
		setMessageText('');
	};

	const ctrlHandler = (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		if (event.ctrlKey && event.keyCode === 13) {
			sendMessage();
		}
	};

	const changeMessage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setMessageText(event.target.value);
	};

	const scrollToBottom = () => {
		if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: "auto" })
	};

	useEffect(scrollToBottom, [chat]);

	const classes = useStyle();
	return (
		<div className={classes.root}>
			<Grid container direction='column' justify='center'>
				<Grid item className={`${classes.messages} ${scrollbar.scroll}`}>
					{chatsError ? <div className={classes.error}>Произошла ошибка, обновите чаты</div> : <Messages photoUrl={photoUrl.toString()}
																												   messages={chat.messages}/>}
					<div style={{ float:"left", clear: "both" }}
						 ref={ messagesEndRef }>
					</div>
				</Grid>
				<Grid item container justify='center'>
					{!chatsError && <div className={inputArea.container}>
						<TextareaAutosize id='standard-basic'
										  placeholder='Введите сообщение...'
										  value={messageText}
										  onChange={changeMessage}
										  onKeyDown={ctrlHandler}
										  className={`${inputArea.message} ${scrollbar.scrollInput}`}
						/>
						{isSending
							?<div className={inputArea.preloader}><Preloader /></div>
							:<Button className={inputArea.btn}
									 variant="outlined"
									 onClick={sendMessage}>
								<SendIcon className={inputArea.btn}/>
							</Button>
						}
					</div>}
				</Grid>
			</Grid>
		</div>
	)
};