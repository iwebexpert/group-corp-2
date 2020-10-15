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
import Preloader from "../Common/Preloader/Preloader";

const styles = {
	root: {
		backgroundColor: '#1a2236',
		height: '100%',
		maxWidth: '100%',
		position: 'relative'
	},
	messages: {
		maxWidth: '100%',
		minHeight: '75vh',
		maxHeight: '75vh',
		overflowY: 'scroll',
	},
	error: {
		marginTop: '32px',
		color: 'white',
		fontSize: '24px'
	},
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

		this.props.addMessageThunk(this.props.chat.id, author, messageText, false);
		this.setState({
			messageText: ''
		});
	};

	ctrlHandler = (event) => {
		if (event.ctrlKey && event.keyCode === 13) {
			this.sendMessage();
		}
	};

	changeMessage = (event) => {
		let message = event.target.value;
		this.setState({
			messageText: message
		});
	};


	scrollToBottom = () => {
		this.messagesEnd.scrollIntoView({ behavior: "auto" });
	}

	componentDidMount() {
		this.scrollToBottom();
	}

	componentDidUpdate() {
		this.scrollToBottom();
	}

	render() {
		const {classes} = this.props;
		const {author, photoUrl, chat, deleteMessage} = this.props;

		return (
			<div className={classes.root}>
				<Grid container direction='column' justify='center' align='center'>
					<Grid item xs={12} className={`${classes.messages} ${scrollbar.scroll}`}>
						{this.props.chatsError ? <div className={classes.error}>Произошла ошибка, обновите чаты</div> : <Messages author={author}
							photoUrl={photoUrl}
							messages={chat.messages}
							deleteMessage={deleteMessage}/>}
						<div style={{ float:"left", clear: "both" }}
							 ref={(el) => { this.messagesEnd = el; }}>
						</div>
					</Grid>
					<Grid item container justify='center'>
						{!this.props.chatsError && <div className={inputArea.container}>
							<TextareaAutosize type='text' id='standard-basic'
											  placeholder='Введите сообщение...'
											  value={this.state.messageText}
											  onChange={this.changeMessage}
											  onKeyDown={this.ctrlHandler}
											  className={`${inputArea.message} ${scrollbar.scrollInput}`}
							/>
							{this.props.isSending
								?<div className={inputArea.preloader}><Preloader /></div>
								:<Button className={inputArea.btn}
										 variant="outlined"
										 onClick={this.sendMessage}>
									<SendIcon className={inputArea.btn}/>
								</Button>
							}
						</div>}
					</Grid>
				</Grid>
			</div>
		);
	};
}

export default withStyles(styles)(MessageField);