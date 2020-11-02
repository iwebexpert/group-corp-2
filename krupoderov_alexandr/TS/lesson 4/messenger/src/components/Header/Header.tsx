import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import logo from '../../assets/img/logo.png';
import User from './User/User';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileThunk } from '../../store/ProfileReducer';
import {AppState} from '../../store/store';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: 0,
		padding: 0,
		backgroundColor: '#44c4b8',
		height: '10vh',
		justifyContent: 'center'
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	logo: {
		width: '80px',
		height: '50px'
	},
	menuAndUserInfo: {
		display: 'flex',
		justifyContent: 'space-between',
		maxWidth: '30%'
	},
	profile: {
		display: "block",
		color: 'white',
		marginRight: "16px"
	},
	link: {
		color: 'white',
		textDecoration: 'none'
	}
}));

export const Header = () => {
	const author = useSelector((state: AppState) => state.profile.author);
	const photoUrl = useSelector((state: AppState) => state.profile.photoUrl);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProfileThunk());
	}, []);

	const classes = useStyles();
	return (
		<>
			<AppBar position="static" className={classes.root}>
				<Toolbar>
					<img className={classes.logo} src={logo} alt="logo"/>
					<Typography variant="h6" className={classes.title}>
						Messenger
					</Typography>
					<div className={classes.profile}>
						<NavLink className={classes.link} to='/profile'>Profile</NavLink>
					</div>
					<div className={classes.menuAndUserInfo}>
						<User author={author} photoUrl={photoUrl}/>
					</div>
				</Toolbar>
			</AppBar>
		</>
	);
};