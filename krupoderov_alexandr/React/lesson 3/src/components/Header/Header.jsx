import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import logo from '../../assets/img/logo.png';
import UserMenu from './UserMenu/UserMenu';
import User from './User/User';

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
		justifyContent: 'space-between'
	}
}));

const Header = (props) => {
	let {author, photoUrl, setAuthor, setPhotoUrl} = props;
	const classes = useStyles();
	return (
		<>
			<AppBar position="static" className={classes.root}>
				<Toolbar>
					<img className={classes.logo} src={logo} alt=""/>
					<Typography variant="h6" className={classes.title}>
						Messenger
					</Typography>
					<div className={classes.menuAndUserInfo}>
						<User author={author} photoUrl={photoUrl}/>
						<UserMenu setAuthor={setAuthor} setPhotoUrl={setPhotoUrl} author={author} photoUrl={photoUrl}/>
					</div>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default Header;