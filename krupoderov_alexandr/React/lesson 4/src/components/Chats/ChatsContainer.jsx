import React from 'react';
import Chats from './Chats';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {addChat} from "../../store/ChatsReducer";

const ChatsContainer = (props) => {
	return <Chats {...props}/>
};

let mapStateToProps = (state) => {
	return{
		chats: state.chats.chats
	};
};

export default compose(
	connect(mapStateToProps, {addChat}))
(ChatsContainer);