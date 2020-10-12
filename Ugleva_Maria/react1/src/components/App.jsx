import React, { useEffect } from 'react';
import Layout from './Layout';
import { connect } from 'react-redux';
import { addChatsToState } from '../actions/chatsAction';
import { chats } from '../helpers/chatsData';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../index';

const App = (props) => {
	if (!props.allChats.length) {
		useEffect(() => {
			props.addChatsToState(chats);
		}, []);
	}
	return (
		<ConnectedRouter history={history}>
			<Layout />
		</ConnectedRouter>
	);
};
const mapStateToProps = (state) => {
	return {
		allChats: state.allChats,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		addChatsToState: (chats) => dispatch(addChatsToState(chats)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
