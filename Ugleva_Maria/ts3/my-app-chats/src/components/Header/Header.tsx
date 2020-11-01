import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import { fetchProfile } from '../../actions/profileAction';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AppState } from '../../reducers/reducer';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		color: 'white',
	},
	title: {
		flexGrow: 1,
	},
	profileLink: {
		flexDirection: 'row',
		display: 'flex',
	},
	profileUser: {
		display: 'flex',
		alignItems: 'center',
		textTransform: 'uppercase',
		marginLeft: '5px',
		color: 'white',
	},
	chatListHeader: {
		color: 'white',
	},
	loading: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: '20px',
	},
}));

function Header() {
	const classes = useStyles();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchProfile());
	}, []);
	const profile = useSelector((state: AppState) => state.profile.entries);
	const isLoading = useSelector((state: AppState) => state.allChats.loading);

	return (
		<>
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="h6" className={classes.title}>
							<Link to="/">
								<Button className={classes.chatListHeader}>Список чатов</Button>
							</Link>
						</Typography>
						<Link className={classes.profileLink} to="/profile">
							<Avatar alt={profile.name} src="./img/ivan.jpg" />
							<span className={classes.profileUser} color="inherit">
								{profile.name}
							</span>
						</Link>
					</Toolbar>
				</AppBar>
			</div>
			{isLoading ? (
				<div className={classes.loading}>
					<CircularProgress />
				</div>
			) : null}
		</>
	);
}

export default Header;
