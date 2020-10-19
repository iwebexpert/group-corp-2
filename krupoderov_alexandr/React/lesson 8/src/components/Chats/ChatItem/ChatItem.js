import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
	root: {
		position: "relative",
		width: 'cal(100%-24px)',
		height: '8%',
		display: 'flex',
		padding: '24px',
		alignItems: 'center',
		cursor: 'pointer'
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
	activeLink: {
		backgroundColor: 'rgba(38, 166, 154, 0.1)',
		borderLeft: '3px solid #26a69a'
	},
	fire: {
		backgroundColor: '#ffe253'
	},
	delete: {
		marginLeft: '20px'
	}
});

const ChatItem = ({setActiveChatHandler, deleteChat, isFire, photoUrl, isActive, id, name}) => {
	const classes = useStyles();

	const chatClickHandler = () => {
		setActiveChatHandler(id);
	};

	const deleteHandler = () => {
		deleteChat(id);
	};

	return (
		<div onClick={() => {chatClickHandler()}}
			 className={`${classes.root} ${isActive ? classes.activeLink : ''} 
			 							 ${isFire ? classes.fire : ''}`}>
			<Avatar className={classes.avatar} alt={name} src={photoUrl} />
			<div className={classes.text}>{name}</div>
			<DeleteIcon color='primary' className={classes.delete} onClick={deleteHandler}/>
		</div>
	);
};

export default ChatItem;