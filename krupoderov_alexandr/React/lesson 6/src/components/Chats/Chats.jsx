import React from 'react';
import ChatItem from './ChatItem/ChatItem';
import {withStyles} from "@material-ui/core";
import NewChatEditMode from "./NewChatEditMode/NewChatEditMode";
import importedClasses from './Chats.module.css';
import {deleteChat} from "../../store/ChatsReducer";

const styles = {
	root: {
		background: '#2e364a',
		maxHeight: '90vh',
		height: '100%',
		display: 'flex',
		flexDirection: 'column'
	},
	btn: {
		display: 'block',
		width: '90%',
		cursor: 'pointer',
		background: '#26a69a',
		border: 'none',
		borderRadius: '10px',
		height: '30px',
		color: 'white',
		textAlign: 'center',
		margin: '15% auto 0 auto',
	},
};

class Chats extends React.Component {
	state = {
		isEditNewChatMode: false
	}

	changeEditMode = (value) => {
		this.setState({
			isEditNewChatMode: value
		})
	}

	addChat = (newChat) => {
		this.changeEditMode(false);
		this.props.addChat(newChat);
		this.props.push(`/chat/${this.props.chats.length + 1}`)
		this.props.setActiveChat(this.props.chats.length + 1);
	}

	componentDidMount() {
		if (!this.props.activeChat) {
			let id = +this.props.location.pathname.split('/')[2];
			this.props.setActiveChat(id);
		}
	}

	render() {
		const {classes, setActiveChat, activeChat, push, unfire, deleteChat} = this.props;

		const isActive = (id) => {
			if (activeChat === id) return true
		};

		const setActiveChatHandler = (id) => {
			unfire(id);
			setActiveChat(id);
			push(`/chat/${id}`);
		}

		const deleteChatHandler = (chatId) => {
			deleteChat(chatId);
			setActiveChat(1);
			push(`/chat/1`);
		}

		let chatsArray = this.props.chats.map(c => <ChatItem push={push} isActive={isActive(c.id)} deleteChat={deleteChatHandler} setActiveChatHandler={setActiveChatHandler} key={c.id} name={c.name}
														photoUrl={c.photoUrl} id={c.id} isFire={c.isFire}/>);
		return (
			<div className={classes.root}>
				<div className={importedClasses.chats}>
					{chatsArray}
				</div>
				{
					this.state.isEditNewChatMode
						? <NewChatEditMode changeEditMode={this.changeEditMode} addChat={this.addChat}/>
						: <button onClick={() => {this.changeEditMode(true)}} className={classes.btn}>New Chat</button>
				}
			</div>
		);
	}
}

export default withStyles(styles)(Chats);