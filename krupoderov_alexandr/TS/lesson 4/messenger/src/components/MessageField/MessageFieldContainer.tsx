import React from 'react';
import { MessageField } from './MessageField';
import Preloader from '../Common/Preloader/Preloader';
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { AppState } from '../../store/store';

type MessageFieldContainerProps = {
	isInitialized: boolean
}

export const MessageFieldContainer: React.FC<MessageFieldContainerProps> = ({isInitialized}) => {
	const chats = useSelector((state: AppState) => state.chats.chats);
	const {id} = useParams<{id: string}>();
	if (!isInitialized) return <><Preloader/></>;
	let chat = chats.filter(c => +c.id === +id);
	return <MessageField chat={chat[0]}/>;
};
