import React from 'react';
import Message from './Message/Message';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
	root: {
		display: 'flex',
		flexDirection: 'column',
	}
};

class Messages extends React.PureComponent{
	render() {
		let {classes, photoUrl} = this.props;
		let messages = this.props.messages;
		let messagesArray = [];
		if (messages.length > 0) {
			for (let i = messages.length - 1; i >= 0; i--){
				messagesArray[i] = <Message key={messages[i].id} text={messages[i].message} photoUrl={photoUrl} author={messages[i].author}/>
			}
		}
		return (
			<div className={classes.root}>
				{messagesArray}
			</div>
		);
	};
}

export default withStyles(styles)(Messages);