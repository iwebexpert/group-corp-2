import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import MessageField from './MessageField';
import { addMessage } from '../../store/MessageReducer';

class MessageFieldContainer extends React.Component{
	render() {
		return <MessageField
					messages={ this.props.messages }
					author={ this.props.author }
					addMesage={ this.props.addMessage }/>
	};
}

const mapStateToProps = (state) => {
	return {
		messages: state.messagePage.messages
	};
};

export default compose(
	connect(mapStateToProps, {addMessage})
)(MessageFieldContainer);
