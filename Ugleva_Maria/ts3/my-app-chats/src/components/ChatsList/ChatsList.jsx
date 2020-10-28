import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchNewChat, fetchDeleteChat } from '../../actions/chatsAction';
import { nanoid } from 'nanoid';
import { push } from 'connected-react-router';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import deleteImg from '../../img/delete.svg';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		padding: '20px',
		margin: '0 auto',
		maxWidth: '360px',
		boxSizing: 'border-box',
		backgroundColor: theme.palette.background.paper,
	},
	margin: {
		margin: theme.spacing(1),
		marginRight: '0px',
		backgroundColor: '#3f51b5',
		color: 'white',
		'&:hover': {
			color: '#3f51b5',
		},
	},
	chatListItem: {
		padding: '10px 0',
		color: 'black',
	},
	highlight: {
		backgroundColor: 'rgba(63, 81, 181, .1)',
	},
	avatar: {
		margin: '0 10px',
	},
	deleteImg: {
		width: '16px',
		height: '16px',
		zIndex: '1200',
		marginRight: '10px',
	},
	formAddChat: {
		display: 'flex',
		justifyContent: 'space-between',
	},
}));

const ChatsList = () => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const allChats = useSelector((state) => {
		let chats = [];
		for (let key in state.allChats.entries) {
			chats.push(state.allChats.entries[key]);
		}
		return chats;
	});
	const isLoading = useSelector((state) => state.allChats.loading);
	let activeChat = useSelector((state) => state.activeChat);
	const [newChat, setValNewChat] = useState('');
	const handleChange = (e) => {
		setValNewChat(e.target.value);
	};
	const onDelete = (e) => {
		console.log('delete', e.target.id);
		dispatch(fetchDeleteChat(e.target.id));
	};
	const onCreate = (e) => {
		e.preventDefault();
		if (newChat !== '') {
			const newChatStructure = {
				id: nanoid(),
				title: newChat,
				highlight: false,
				avatar: '',
			};
			dispatch(fetchNewChat(newChatStructure));
			dispatch(push(`/chats/${newChatStructure.id}`));
			setValNewChat('');
		}
	};
	return (
		<div className={classes.root}>
			<List component="nav" aria-label="secondary mailbox folders">
				{allChats.map((item) => {
					return (
						<div className={item.highlight === true && activeChat !== item.id ? classes.highlight : null}>
							<Link to={`/chats/${item.id}`} key={item.id}>
								<ListItem className={classes.chatListItem} button>
									<Avatar alt="Remy Sharp" src={item.avatar} className={classes.avatar} />
									<ListItemText primary={item.title} />
									<img
										className={classes.deleteImg}
										src={deleteImg}
										id={item.id}
										onClick={onDelete}
										alt="delete"
									/>
								</ListItem>
								<Divider />
							</Link>
						</div>
					);
				})}
			</List>
			<div className={classes.formAddChat}>
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

export default ChatsList;
