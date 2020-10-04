import React from 'react';
import MessageFieldContainer from './components/MessageField/MessageFieldContainer';
import {makeStyles} from '@material-ui/core/styles';
import ChatsContainer from './components/Chats/ChatsContainer';
import {Grid} from '@material-ui/core';
import HeaderContainer from './components/Header/HeaderContainer';
import {Route} from "react-router-dom";
import TextHelper from "./pages/TextHelper";
import Profile from "./components/Profile/Profile";

const styles = makeStyles((theme) => ({
	root: {
		margin: 0,
		padding: 0
	},
	backContainer: {
		width: '100%',
		height: '90vh'
	},

}));

const App = () => {
	const classes = styles();
	return (
		<Grid container xl={12} className={classes.root}>
			<Grid item xs={12}>
				<HeaderContainer />
			</Grid>
			<Grid item container xs={12} className={classes.backContainer}>
				<Grid item xs={2} >
					<ChatsContainer/>
				</Grid>
				<Grid item xs={10}>
					<Route path='/chat/:id' component={MessageFieldContainer} exact/>
					<Route path='/chat' component={() => <TextHelper text='Выберите чат'/>} exact/>
					<Route path='/profile' component={() => <Profile/>} exact/>
				</Grid>
			</Grid>
		</Grid>
	);
};


export default App;