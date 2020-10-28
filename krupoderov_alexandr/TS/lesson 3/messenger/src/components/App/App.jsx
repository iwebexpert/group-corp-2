import React, {useEffect, useState} from 'react';
import { MessageFieldContainer } from '../MessageField/MessageFieldContainer';
import {makeStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import {Route, useLocation} from 'react-router-dom';
import TextHelper from '../../pages/TextHelper';
import Paper from '@material-ui/core/Paper';
import Preloader from '../Common/Preloader/Preloader';
import {useDispatch, useSelector} from 'react-redux';
import {getChatsThunk, setActiveChat} from '../../store/ChatsReducer';
import {Header} from '../Header/Header';
import {Chats} from '../Chats/Chats';
import {Profile} from '../Profile/Profile';

const useStyles = makeStyles({
	root: {
		margin: 0,
		padding: 0
	},
	backContainer: {
		width: '100%',
		height: '90vh'
	},
	paper: {
		backgroundColor: '#1a2236',
		width: '100%',
		height: '100%'
	}
});

export const App = () => {
	const [isInitialized, setInitialized] = useState(false);
	const chats = useSelector(state => state.chats.chats);
	const activeChat = useSelector(state => state.chats.activeChat);
	const dispatch = useDispatch();
	const location = useLocation();

	useEffect(() => {
		setInitialized(false);
		initializeApp().then(() => setInitialized(true));
	}, []);

	const initializeApp = async () => {
		await dispatch(getChatsThunk());
		if (!activeChat){
			dispatch(setActiveChat(+location.pathname.split('/')[2]));
		}
	};

	const classes = useStyles();
	if (!isInitialized) return <Preloader/>
	return (
		<Grid container xl={12} className={classes.root}>
			<Grid item xs={12}>
				<Header />
			</Grid>
			<Grid item container xs={12} className={classes.backContainer}>
				<Grid item xs={2} >
					<Chats chats={chats}/>
				</Grid>
				<Grid item xs={10}>
					<Paper square elevation={24} className={classes.paper}>
						<Route path='/chat/:id' component={() => <MessageFieldContainer isInitialized={isInitialized}
																						chats={chats}/>} exact/>
						<Route path='/chat' component={() => <TextHelper text='Выберите чат'/>} exact/>
						<Route path='/profile' component={() => <Profile />} exact/>
						<Route path='/' component={() => <Profile />} exact/>
					</Paper>
				</Grid>
			</Grid>
		</Grid>
	);
};
