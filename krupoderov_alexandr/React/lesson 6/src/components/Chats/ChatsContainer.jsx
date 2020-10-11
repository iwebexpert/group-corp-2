import React from 'react';
import Chats from './Chats';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {addChat, deleteChat, setActiveChat, unfire} from '../../store/ChatsReducer';
import {push} from 'connected-react-router';
import {withRouter} from "react-router-dom";

const ChatsContainer = (props) => {
	return <Chats {...props}/>
};

let mapStateToProps = (state) => {
	return{
		chats: state.chats.chats,
		activeChat: state.chats.activeChat
	};
};

export default compose(
	withRouter,
	connect(mapStateToProps, {addChat, setActiveChat, push, unfire, deleteChat}))
(ChatsContainer);