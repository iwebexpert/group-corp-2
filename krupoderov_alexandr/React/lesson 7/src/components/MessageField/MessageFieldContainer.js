import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import MessageField from './MessageField';
import {addMessage, addMessageThunk, deleteMessage, getChatsThunk} from '../../store/ChatsReducer';
import Preloader from "../Common/Preloader/Preloader";
import {withRouter} from "react-router-dom";
import {push} from 'connected-react-router';

class MessageFieldContainer extends React.Component{
	render() {
		if (this.props.isFetching) return <Preloader />
		let chat = this.props.chats.filter(c => +c.id === +this.props.match.params.id);
		return <MessageField chat={chat[0]}
							 author={this.props.author}
							 photoUrl={this.props.photoUrl}
							 addMessage={this.props.addMessage}
							 deleteMessage={this.props.deleteMessage}
							 chatsError={this.props.chatsError}
							 addMessageThunk={this.props.addMessageThunk}
							 isSending={this.props.isSending}/>
	};
}

const mapStateToProps = (state) => {
	return {
		author: state.profile.author,
		photoUrl: state.profile.photoUrl,
		isFetching: state.chats.isFetching,
		chatsError: state.chats.chatsError,
		isSending: state.chats.isSending
	};
};

export default compose(
	withRouter,
	connect(mapStateToProps, {addMessage, addMessageThunk, deleteMessage, getChatsThunk, push})
)(MessageFieldContainer);
