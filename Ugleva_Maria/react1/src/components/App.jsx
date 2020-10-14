import React, { useEffect } from 'react';
import Layout from './Layout';
import { connect } from 'react-redux';
import { addChatsToState, chatsLoadAction } from '../actions/chatsAction';
import { chats } from '../helpers/chatsData';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../index';

const App = (props) => {
	if (!props.allChats.length) {
		useEffect(() => {
			props.chatsLoadAction();
		}, []);
	}
	return (
		<ConnectedRouter history={history}>
			<Layout />
		</ConnectedRouter>
	);
};
const mapStateToProps = (state) => {
	let chats = [];
	for (let key in state.allChats.entries) {
		chats.push(state.allChats.entries[key]);
	}
	return {
		allChats: chats,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		addChatsToState: (chats) => dispatch(addChatsToState(chats)),
		chatsLoadAction: () => dispatch(chatsLoadAction()),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
