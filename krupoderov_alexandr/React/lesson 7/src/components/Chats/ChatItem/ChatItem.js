import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = makeStyles(theme => ({
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
}));

const ChatItem = (props) => {
	const classes = styles();
	const chatClickHandler = () => {
		props.setActiveChatHandler(props.id);
	};

	const deleteHandler = () => {
		props.deleteChat(props.id);
	};

	return (
		<div onClick={() => {chatClickHandler()}} className={`${classes.root} ${props.isActive ? classes.activeLink : ''} ${props.isFire ? classes.fire : ''}`}>
			<Avatar className={classes.avatar} alt={props.name} src={props.photoUrl} />
			<div className={classes.text}>{props.name}</div>
			<DeleteIcon color='primary' className={classes.delete} onClick={deleteHandler}/>
		</div>
	);
};

export default ChatItem;