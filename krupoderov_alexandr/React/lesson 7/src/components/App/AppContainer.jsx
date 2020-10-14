import React from "react";
import App from "./App";
import {connect} from "react-redux";
import {getChatsThunk, setActiveChat} from "../../store/ChatsReducer";
import {compose} from "redux";
import {withRouter} from "react-router-dom";

const AppContainer = (props) => {
	return <App {...props}/>
}

const mapStateToProps = state => ({
	chats: state.chats.chats,
	activeChat: state.chats.activeChat,
	state
});

export default compose(
	withRouter,
	connect(mapStateToProps, {getChatsThunk, setActiveChat})
)(AppContainer);
