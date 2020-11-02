import React, { useState } from 'react';
import ChatItem from './ChatItem/ChatItem';
import { makeStyles } from '@material-ui/core';
import NewChatEditMode from './NewChatEditMode/NewChatEditMode';
import importedClasses from './Chats.module.css';
import Preloader from '../Common/Preloader/Preloader';
import { useDispatch, useSelector } from 'react-redux';
import {
	addChatThunkCreator,
	deleteChatThunkCreator,
	getChatsThunkCreator,
	setActiveChat,
	unfire
} from '../../store/actions/chats';
import {push} from 'connected-react-router';
import {AppState} from '../../store/store';
import {IChatType} from '../../types';

const useStyles = makeStyles({
	root: {
		background: '#2e364a',
		maxHeight: '90vh',
		height: '100%',
		display: 'flex',
		flexDirection: 'column'
	},
	btn: {
		display: 'block',
		width: '90%',
		cursor: 'pointer',
		background: '#26a69a',
		border: 'none',
		borderRadius: '10px',
		height: '30px',
		color: 'white',
		textAlign: 'center',
		margin: '12% auto 32px auto',
	},
	addOrDeleteError: {
		color: 'tomato',
		fontSize: '24px',
		padding: '16px'
	}
});

type ChatsProps = {
	chats: Array<IChatType>
}

export const Chats: React.FC<ChatsProps> = ({chats}) => {
	const [isEditNewChatMode, setEditNewChatMode] = useState(false);
	const [activeChat, isFetching, chatsError, addError, deleteError] = useSelector((state: AppState) =>
		[state.chats.activeChat,
			state.chats.isFetching,
			state.chats.chatsError,
			state.chats.addError,
			state.chats.deleteError]);
	const dispatch = useDispatch();

	const isActive = (id: string) => {
		return +activeChat === +id;

	};

	const setActiveChatHandler = (id: string) => {
		dispatch(unfire(id));
		dispatch(setActiveChat(id));
		dispatch(push(`/chat/${id}`));
	};

	const deleteChatHandler = (id: string) => {
		dispatch(deleteChatThunkCreator(+id));
	};

	const changeEditMode = (value: boolean) => {
		setEditNewChatMode(value);
	};

	const addChat = (name: string) => {
		setEditNewChatMode(false);
		dispatch(addChatThunkCreator(name));
		dispatch(setActiveChat(chats.length + 1));
	};

	let chatsArray = chats.map(c => <ChatItem isActive={isActive(c.id)}
											  deleteChat={deleteChatHandler}
											  setActiveChatHandler={setActiveChatHandler}
											  key={c.id}
											  name={c.name}
											  photoUrl={c.photoUrl}
											  id={c.id}
											  isFire={c.isFire}/>);
	const classes = useStyles();
	return (
		<div className={classes.root}>
			{
				(addError || deleteError)
				&& <div className={classes.addOrDeleteError}>Произошла ошибка при добавлении или
					удалении чата. Повторите попытку позже</div>
			}
			{
				isFetching
					? <Preloader/>
					: <>
						<div className={importedClasses.chats}>
							{chatsArray}
						</div>
						{
							chatsError && <div className={classes.addOrDeleteError}>
								Произошла ошибка обновлении чатов
								<button onClick={() => {
									getChatsThunkCreator()
								}} className={classes.btn}>Reload</button>
							</div>
						}
						{
							isEditNewChatMode
								? <NewChatEditMode changeEditMode={changeEditMode} addChat={addChat}/>
								: <button onClick={() => {
									changeEditMode(true)
								}} className={classes.btn}>New Chat</button>
						}</>}
		</div>
	);
};