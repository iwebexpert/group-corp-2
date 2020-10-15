import React, {Component, PureComponent} from 'react';
import MessageFieldContainer from '../MessageField/MessageFieldContainer';
import {withStyles} from '@material-ui/core/styles';
import ChatsContainer from '../Chats/ChatsContainer';
import {Grid} from '@material-ui/core';
import HeaderContainer from '../Header/HeaderContainer';
import {Route} from 'react-router-dom';
import TextHelper from '../../pages/TextHelper';
import ProfileContainer from '../Profile/ProfileContainer';
import Paper from "@material-ui/core/Paper";
import Preloader from "../Common/Preloader/Preloader";

const styles = {
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
};

class App extends Component{
	state = {
		isInitialized: false
	};

	componentDidMount() {
		this.setState({isInitialized: false});
		this.initializeApp();
	};

	initializeApp = () => {
		this.props.getChatsThunk();
		this.setState({isInitialized: true});
		if (!this.props.activeChat){
			this.props.setActiveChat(+this.props.location.pathname.split('/')[2]);
		}
	};

	render() {
		if (!this.state.isInitialized) {
			return <Preloader/>
		}
		const {classes, chats} = this.props;
		return (
			<Grid container xl={12} className={classes.root}>
				<Grid item xs={12}>
					<HeaderContainer />
				</Grid>
				<Grid item container xs={12} className={classes.backContainer}>
					<Grid item xs={2} >
						<ChatsContainer chats={chats}/>
					</Grid>
					<Grid item xs={10}>
						<Paper square elevation={24} className={classes.paper}>
							<Route path='/chat/:id' component={() => <MessageFieldContainer isInitialized={this.state.isInitialized} chats={chats}/>} exact/>
							<Route path='/chat' component={() => <TextHelper text='Выберите чат'/>} exact/>
							<Route path='/profile' component={() => <ProfileContainer/>} exact/>
							<Route path='/' component={() => <ProfileContainer/>} exact/>
						</Paper>
					</Grid>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(App);
