import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addNewChat } from '../../actions/chatsAction';
import { nanoid } from 'nanoid';
import { push } from 'connected-react-router';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		padding: '20px',
		maxWidth: '360px',
		boxSizing: 'border-box',
		backgroundColor: theme.palette.background.paper,
	},
	margin: {
		margin: theme.spacing(1),
		backgroundColor: '#3f51b5',
		color: 'white',
		'&:hover': {
			color: 'black',
		},
	},
	chatListItem: {
		padding: '0',
		color: 'black',
	},
	highlight: {
		backgroundColor: 'rgba(63, 81, 181, .1)',
	}
}));

const ChatsList = (props) => {
	const classes = useStyles();
	const [newChat, setValNewChat] = useState('');
	const handleChange = (e) => {
		setValNewChat(e.target.value);
	};
	const onCreate = (e) => {
		e.preventDefault();
		if (newChat !== '') {
			const newChatStructure = {
				id: nanoid(),
				title: newChat,
				highlight: false,
				messages: [],
			};
			props.addNewChat(newChatStructure);
			props.redirect(newChatStructure.id);
			setValNewChat('');
		}
	};
	return (
		<div className={classes.root}>
			<List component="nav" aria-label="secondary mailbox folders">
				{props.allChats.map((item) => {
					return (
						<Link to={`/chats/${item.id}`} key={item.id}>
							<ListItem className={classes.chatListItem} button>
								<ListItemText className={(item.highlight === true && props.activeChat !== item.id) ? classes.highlight : null} primary={item.title} />
							</ListItem>
						</Link>
					);
				})}
			</List>
			<div>
				<TextField
					id="standard-textarea"
					onChange={handleChange}
					value={newChat}
					label="Заголовок"
					placeholder="Новый"
					multiline
				/>
				<Button size="small" onClick={onCreate} color="default" className={classes.margin}>
					Создать чат
				</Button>
			</div>
		</div>
	);
};
const mapStateToProps = (state) => {
	return {
		activeChat: state.activeChat,
		allChats: state.allChats,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		addNewChat: (data) => dispatch(addNewChat(data)),
		redirect: (id) => dispatch(push(`/chats/${id}`)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatsList);
