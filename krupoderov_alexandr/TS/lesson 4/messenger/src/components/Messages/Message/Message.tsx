import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Avatar} from '@material-ui/core';
import bot from '../../../assets/img/bot.png';
import { MessageType } from "../../../types";

const styles = makeStyles({
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
});

const Message:React.FC<MessageType> = ({author, photoUrl, text}) => {
	const classes = styles();
	return (
		<div className={`${classes.root} ${author === 'Bot' ? classes.bot : classes.author}`}>
			{author === 'Bot' && <Avatar className={classes.botAvatar} src={bot}/>}
			<div className={classes.message}>
				<div className={`${author !== 'bot'? classes.authorText: classes.botText}`}>{author}</div>
				<div className={`${classes.messageText} ${author === 'Bot' && classes.messageTextBot}`}
					 contentEditable
					 suppressContentEditableWarning={true}>{text}</div>
			</div>
			{author !== 'Bot' && <Avatar className={classes.userAvatar} src={photoUrl}/>}
		</div>
	);
};

export default Message;