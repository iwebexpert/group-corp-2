import React from 'react';
import { MessageField } from './MessageField';
import Preloader from '../Common/Preloader/Preloader';
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';


export const MessageFieldContainer = ({isInitialized}) => {
	const chats = useSelector(state => state.chats.chats);
	const {id} = useParams();
	if (!isInitialized) return <Preloader/>
	let chat = chats.filter(c => +c.id === +id);
	return (
		<MessageField chat={chat[0]}/>
	);
};
