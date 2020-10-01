import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Avatar} from '@material-ui/core';
import bot from '../../../assets/img/bot.png';

const styles = makeStyles(theme => ({
	root: {
		display: 'flex',
		margin: '15px',
		alignItems: 'center',
		maxWidth: '40%',
		minHeight: '10px'
	},
	bot: {
		flexGrow: '1',
		minWidth: '10px',
		alignSelf: 'flex-start',
	},
	author: {
		flexGrow: '1',
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
		alignItems: 'flex-start',
		overflow: 'hidden'
	},
	botAvatar: {
		marginRight: '10px'
	},
	userAvatar: {
		marginLeft: '10px'
	},
	authorText: {
		display: 'flex',
		flexWrap: 'wrap',
		fontSize: '14px',
		alignSelf: "flex-end",
		fontWeight: 'bold'
	},
	botText: {
		fontWeight: 'bold',
		display: 'flex',
		flexWrap: 'wrap',
		fontSize: '14px'
	},
	messageText: {
		overflow: 'hidden',
		maxWidth: '100%',
		fontSize: '18px',
		outline: 'none'
	}
}));

const Message = (props) => {
	const classes = styles();
	const isBot = () => {
		return props.author === 'bot';
	};

	return (
		<div className={`${classes.root} ${isBot() ? classes.bot : classes.author}`}>
			{isBot() && <Avatar className={classes.botAvatar} src={bot}/>}
			<div className={classes.message}>
				<div className={`${!isBot() ? classes.authorText: classes.botText}`}>{props.author}</div>
				<div className={classes.messageText} contentEditable>{props.text}</div>
			</div>
			{!isBot() && <Avatar className={classes.userAvatar} src={props.photoUrl}/>}
		</div>
	);
};

export default Message;