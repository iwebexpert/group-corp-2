import React from "react";
import {NavLink} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';

const styles = makeStyles(theme => ({
	root: {
		position: "relative",
		width: 'cal(100%-24px)',
		height: '8%',
		display: 'flex',
		padding: '24px',
		alignItems: 'center'
	},
	text: {
		marginLeft: '30px',
		color: '#26a69a',
		fontSize: '18px',
		justifySelf: 'center'
	},
	avatar: {
		height: '70px',
		width: '70px',
	},
	active: {
		backgroundColor: 'rgba(38, 166, 154, 0.1)',
		borderLeft: '3px solid #26a69a'
	}
}));

const ChatItem = (props) => {
	const classes = styles();
	return (
		<NavLink activeClassName={classes.active} className={classes.root} to={`/chat/${props.id}`}>
			<Avatar className={classes.avatar} alt={props.name} src={props.photoUrl} />
			<div className={classes.text}>{props.name}</div>
		</NavLink>
	);
};

export default ChatItem;