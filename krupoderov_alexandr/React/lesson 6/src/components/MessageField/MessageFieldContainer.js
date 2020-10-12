import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import MessageField from './MessageField';
import {addMessage, deleteMessage} from '../../store/ChatsReducer';

class MessageFieldContainer extends React.Component{
	getChat = (chats, id) =>{
		for (let i = 0; i < chats.length; i++){
			if (+id === chats[i].id) {
				return chats[i]
			}
		}
	}

	render() {
		let chat = this.getChat(this.props.chats, this.props.match.params.id);
		return <MessageField chat={chat} author={this.props.author} photoUrl={this.props.photoUrl} addMessage={this.props.addMessage} deleteMessage={this.props.deleteMessage}/>
	};
}

const mapStateToProps = (state) => {
	return {
		author: state.profile.author,
		photoUrl: state.profile.photoUrl,
		chats: state.chats.chats
	};
};

export default compose(
	connect(mapStateToProps, {addMessage, deleteMessage})
)(MessageFieldContainer);
