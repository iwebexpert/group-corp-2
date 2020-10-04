import React from 'react';
import Message from './Message/Message';
import withStyles from '@material-ui/core/styles/withStyles';
import TextHelper from "../../pages/TextHelper";

const styles = {
	root: {
		display: 'flex',
		flexDirection: 'column',
	}
};

class Messages extends React.Component{
	render() {
		let {classes, photoUrl} = this.props;
		let messagesArray = [];
		if (this.props.messages.length > 0) {
			for (let i = this.props.messages.length - 1; i >= 0; i--){
				messagesArray.unshift(<Message key={this.props.messages[i].id} text={this.props.messages[i].text} photoUrl={photoUrl} author={this.props.messages[i].author} isBot={this.props.messages[i].isBot}/>)
			}
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