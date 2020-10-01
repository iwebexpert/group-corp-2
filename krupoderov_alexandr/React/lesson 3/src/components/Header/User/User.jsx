import React from 'react';
import {Avatar, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '8%'
	},
	userName: {
		fontSize: '20px',
		marginRight: theme.spacing(1)
	}
}));

const User = (props) => {
	let {author, photoUrl} = props;
	const classes = styles();
	return (
		<div className={classes.root}>
			<Typography className={classes.userName}>{author}</Typography>
			<Avatar src={photoUrl} alt={author}/>
		</div>
	);
};

export default User;