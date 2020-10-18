import React, { useEffect } from 'react';
import Layout from './Layout';
import { useSelector, useDispatch } from 'react-redux';
import { chatsLoadAction } from '../actions/chatsAction';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../index';

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(chatsLoadAction());
	}, []);
	return (
		<ConnectedRouter history={history}>
			<Layout />
		</ConnectedRouter>
	);
};

export default App;
