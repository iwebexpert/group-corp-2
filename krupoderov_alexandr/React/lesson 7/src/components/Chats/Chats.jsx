import React from 'react';
import ChatItem from './ChatItem/ChatItem';
import {withStyles} from "@material-ui/core";
import NewChatEditMode from "./NewChatEditMode/NewChatEditMode";
import importedClasses from './Chats.module.css';
import {deleteChat} from "../../store/ChatsReducer";
import Preloader from "../Common/Preloader/Preloader";

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
		margin: '12% auto 32px auto',
	},
	addOrDeleteError: {
		color: 'tomato',
		fontSize: '24px',
		padding: '16px'
	}
};

class Chats extends React.Component {
	state = {
		isEditNewChatMode: false
	};

	changeEditMode = (value) => {
		this.setState({
			isEditNewChatMode: value
		});
	};

	addChat = (name) => {
		this.changeEditMode(false);
		this.props.addChatThunk(name);
		this.props.setActiveChat(this.props.chats.length + 1);
	};

	render() {
 		const {classes, setActiveChat, activeChat, push, unfire, deleteChatThunk, chats, isFetching} = this.props;
		const isActive = (id) => {
			if (+activeChat === +id) return true
		};

		const setActiveChatHandler = (id) => {
			unfire(id);
			setActiveChat(id);
			push(`/chat/${id}`);
		};

		const deleteChatHandler = (id) => {
			deleteChatThunk(id);
		};

		let chatsArray = chats.map(c => <ChatItem push={push}
												  isActive={isActive(c.id)}
												  deleteChat={deleteChatHandler}
												  setActiveChatHandler={setActiveChatHandler}
												  key={c.id}
												  name={c.name}
												  photoUrl={c.photoUrl}
												  id={c.id}
												  isFire={c.isFire}/>);

		return (
			<div className={classes.root}>
				{
					(this.props.addError || this.props.deleteError)
					&& <div className={classes.addOrDeleteError}>Произошла ошибка при добавлении или удалении чата. Повторите попытку позже</div>
				}
				{isFetching
				?<Preloader />
				: <><div className={importedClasses.chats}>
					{chatsArray}
					</div>
					{
						this.props.chatsError && <div className={classes.addOrDeleteError}>
							Произошла ошибка обновлении чатов
							<button onClick={() => {this.props.getChatsThunk()}} className={classes.btn}>Reload</button>
						</div>
					}
					{
						this.state.isEditNewChatMode
							? <NewChatEditMode changeEditMode={this.changeEditMode} addChat={this.addChat}/>
							: <button onClick={() => {this.changeEditMode(true)}} className={classes.btn}>New Chat</button>
					}</>}
			</div>
		);
	}
}

export default withStyles(styles)(Chats);