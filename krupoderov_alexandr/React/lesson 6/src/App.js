import React from 'react';
import MessageFieldContainer from './components/MessageField/MessageFieldContainer';
import {makeStyles} from '@material-ui/core/styles';
import ChatsContainer from './components/Chats/ChatsContainer';
import {Grid} from '@material-ui/core';
import HeaderContainer from './components/Header/HeaderContainer';
import {Route} from 'react-router-dom';
import TextHelper from './pages/TextHelper';
import ProfileContainer from './components/Profile/ProfileContainer';
import Paper from "@material-ui/core/Paper";

const styles = makeStyles((theme) => ({
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
					<ChatsContainer />
				</Grid>
				<Grid item xs={10}>
					<Paper square elevation={24} className={classes.paper}>
						<Route path='/chat/:id' component={MessageFieldContainer} exact/>
						<Route path='/chat' component={() => <TextHelper text='Выберите чат'/>} exact/>
						<Route path='/profile' component={() => <ProfileContainer/>} exact/>
						<Route path='/' component={() => <ProfileContainer/>} exact/>
					</Paper>
				</Grid>
			</Grid>
		</Grid>
	);
};


export default App;