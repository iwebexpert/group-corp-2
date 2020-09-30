import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import MessageField from './MessageField';
import { addMessage } from '../../store/MessageReducer';

class MessageFieldContainer extends React.Component{
	render() {
		const {messages, author, photoUrl, addMessage} = this.props;
		const {classes} = this.props;
		return <MessageField
					classes={classes}
					messages={ messages }
					author={ author }
					photoUrl={ photoUrl }
					addMesage={ addMessage }
					name={ name }
		/>
	};
}

const mapStateToProps = (state) => {
	return {
		author: state.user.author,
		photoUrl: state.user.photoUrl,
		messages: state.messagePage.messages
	};
};

export default compose(
	connect(mapStateToProps, {addMessage})
)(MessageFieldContainer);
