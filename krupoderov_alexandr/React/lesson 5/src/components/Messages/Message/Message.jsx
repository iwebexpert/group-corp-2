import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Avatar} from '@material-ui/core';
import bot from '../../../assets/img/bot.png';

const styles = makeStyles(theme => ({
	root: {
		display: 'flex',
		margin: '15px',
		maxWidth: '40%',
		minHeight: '10px',
		alignItems: 'center',
		justifyContent: "flex-end"
	},
	bot: {
		minWidth: '10px',
		alignSelf: 'flex-start',
	},
	author: {
		alignSelf: 'flex-end'
	},
	message: {
		color: 'rgba(255,255,255,.8)',
		backgroundColor: '#2e364a',
		borderRadius: '.5rem',
		padding: '.6rem',
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		justifyContent: 'flex-end',
		overflow: 'hidden',
		margin: '8px 0'
	},
	botAvatar: {
		marginRight: '10px'
	},
	userAvatar: {
		marginLeft: '10px'
	},
	authorText: {
		fontSize: '14px',
		fontWeight: 'bold',
		textAlign: 'end'
	},
	botText: {
		fontWeight: 'bold',
		fontSize: '14px',
		textAlign: 'start'
	},
	messageText: {
		overflow: 'hidden',
		maxWidth: '100%',
		fontSize: '18px',
		outline: 'none',
		textAlign: 'end'
	},
	messageTextBot: {
		textAlign: 'start'
	}
}));

const Message = (props) => {
	const classes = styles();
	return (
		<div className={`${classes.root} ${props.isBot ? classes.bot : classes.author}`}>
			{props.isBot && <Avatar className={classes.botAvatar} src={bot}/>}
			<div className={classes.message}>
				<div className={`${!props.isBot ? classes.authorText: classes.botText}`}>{props.author}</div>
				<div className={`${classes.messageText} ${props.isBot && classes.messageTextBot}`} contentEditable>{props.text}</div>
			</div>
			{!props.isBot && <Avatar className={classes.userAvatar} src={props.photoUrl}/>}
		</div>
	);
};

export default Message;