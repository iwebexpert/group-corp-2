import React from 'react';
import Chats from './Chats';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {
	addChatThunk,
	deleteChatThunk, getChatsThunk,
	setActiveChat,
	unfire
} from '../../store/ChatsReducer';
import {push} from 'connected-react-router';
import {withRouter} from "react-router-dom";

const ChatsContainer = (props) => {
	return <Chats {...props}/>
};

let mapStateToProps = (state) => {
	return{
		activeChat: state.chats.activeChat,
		isFetching: state.chats.isFetching,
		chatsError: state.chats.chatsError,
		addError: state.chats.addError,
		deleteError: state.chats.deleteError
	};
};

export default compose(
	withRouter,
	connect(mapStateToProps, {setActiveChat, push, unfire, getChatsThunk, addChatThunk, deleteChatThunk}))
(ChatsContainer);