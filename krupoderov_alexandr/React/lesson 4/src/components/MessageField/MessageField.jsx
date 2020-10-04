import React from 'react';
import Messages from '../Messages/Messages';
import {getBotMessage} from '../../Helpers/bot';
import {Button, withStyles} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import scrollbar from './Scrollbar.module.css';
import inputArea from './MessageField.module.css';
import SendIcon from '@material-ui/icons/Send';

const styles = {
	root: {
		backgroundColor: '#1a2236',
		height: '100%',
		maxWidth: '100%',
	},
	messages: {
		maxWidth: '100%',
		minHeight: '75vh',
		maxHeight: '75vh',
		overflowY: 'scroll',
	}
};


class MessageField extends React.Component {
	state = {
		messageText: '',
	};

	timer;

	sendMessage = () => {
		let {messageText} = this.state;
		let {author} = this.props;
		if (!messageText) {
			alert('Введите текст сообщения');
			return;
		}

		if (!author) {
			alert('Введите имя автора в настройках');
			return;
		}
		this.props.addMessage(author, this.props.chat.id, messageText, false);
		this.setState({
			messageText: ''
		});
	};

	ctrlHandler = (event) => {
		if(event.ctrlKey && event.keyCode === 13){
			this.sendMessage();
		}
	};

	changeMessage = (event) => {
		let message = event.target.value;
		this.setState({
			messageText: message
		});
	};

	componentDidUpdate(prevProps,prevState, snapshot) {
		let botName = this.props.chat.name;
		console.log(this.props)
		if (this.props.chat.messages.length !== 0 && this.props.chat.messages[this.props.chat.messages.length - 1].author !== botName){
			clearInterval(this.timer);
						let botText = getBotMessage(botName);
						this.timer = setTimeout(() => {
							this.props.addMessage(botName, this.props.chat.id, botText, true);
						},
	1500);
		}
	}


	render() {
		const {classes} = this.props;
		return (
			<Paper className={classes.root} elevation={24} square={true}>
				<Grid container direction='column' justify='center' align='center'>
					<Grid item xs={12} className={`${classes.messages} ${scrollbar.scroll}` }>
						<Messages author={this.props.author}
								  photoUrl={this.props.photoUrl}
								  messages={this.props.chat.messages}/>
					</Grid>
					<Grid item container justify='center'>
						<div className={inputArea.container} >
								<TextareaAutosize type='text' id='standard-basic'
												  placeholder='Введите сообщение...'
												  value={this.state.messageText}
												  onChange={this.changeMessage}
												  onKeyDown={this.ctrlHandler}
												  className={`${inputArea.message} ${scrollbar.scrollInput}`}
								 />

								<Button className={inputArea.btn}
										variant="outlined"
										onClick={this.sendMessage}>
										<SendIcon className={inputArea.btn} />
								</Button>
						</div>
					</Grid>
				</Grid>
			</Paper>
		);
	};
}

export default withStyles(styles)(MessageField);