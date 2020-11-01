import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchNewChat, fetchDeleteChat } from '../../actions/chatsAction';
import { nanoid } from 'nanoid';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import deleteImg from '../../img/delete.svg';
import { AppState } from '../../reducers/reducer';
import { withStyles } from '@material-ui/core';
import {Styles} from '../../type';

const styles: { [key: string]: Styles } = {
	root: {
		width: '100%',
		padding: '20px',
		margin: '0 auto',
		maxWidth: '360px',
		boxSizing: 'border-box',
	},
	default: {},
	margin: {
		marginRight: '0px',
		backgroundColor: '#3f51b5',
		color: 'white',
		// '&:hover': {
		// 	color: '#3f51b5',
		// },
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
};
type MessagesListType = {
	classes: Styles;
};
const ChatsList: React.FC<MessagesListType> = ({ classes }) => {
	const dispatch = useDispatch();
	const allChats = useSelector((state: AppState) => {
		let chats = [];
		for (let key in state.allChats.entries) {
			chats.push(state.allChats.entries[key]);
		}
		return chats;
	});
	const isLoading = useSelector((state: AppState) => state.allChats.loading);
	let activeChat = useSelector((state: AppState) => state.activeChat);
	const [newChat, setValNewChat] = useState('');
	const handleChange = (e: any) => {
		setValNewChat(e.target.value);
	};
	const onDelete = (e: any) => {
		dispatch(fetchDeleteChat(e.target.id));
	};
	const onCreate = (e: any) => {
		e.preventDefault();
		if (newChat !== '') {
			const newChatStructure = {
				id: nanoid(),
				title: newChat,
				highlight: false,
				avatar: '',
			};
			dispatch(fetchNewChat(newChatStructure));
			setValNewChat('');
		}
	};
	return (
		<div className={classes.root}>
			<List component="nav" aria-label="secondary mailbox folders">
				{allChats.map((item) => {
					return (
						<div
							className={
								item.highlight === true && activeChat !== item.id ? classes.highlight : classes.default
							}
						>
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

export default withStyles(styles)(ChatsList);
