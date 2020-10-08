import React from 'react';
import Message from './Message/Message';
import withStyles from '@material-ui/core/styles/withStyles';
import TextHelper from "../../pages/TextHelper";

const styles = {
	root: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: '#1a2236',
		width: '100%',
		alignItems: 'flex-end'
	}
};

class Messages extends React.Component{
	render() {
		let {classes, photoUrl} = this.props;
		let messagesArray = [];
		if (this.props.messages.length > 0) {
			for (let i = this.props.messages.length - 1; i >= 0; i--){
				let {id, text, author, isBot} = this.props.messages[i];
				messagesArray.unshift(<Message key={id}
											   text={text}
											   photoUrl={photoUrl}
											   author={author}
											   isBot={isBot}/>)}
		}
		return (
			<div className={classes.root}>
				{messagesArray.length === 0
					? <TextHelper text='Нет сообщений'/>
					: messagesArray
				}
			</div>
		);
	};
}

export default withStyles(styles)(Messages);