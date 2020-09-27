import React from 'react';
import Messages from '../Messages/Messages';
import { getBotMessage } from '../../Helpers/bot';

class MessageField extends React.Component {
	state = {
		messageText: '',
		author: '',
		authorEditMode: false
	};

	sendMessage = () => {
		if (!this.state.messageText) {
			alert('Введите текст сообщения');
			return;
		}
		if (!this.state.author) {
			alert('Введите имя автора');
			return;
		}
		this.props.addMesage(this.state.author,this.state.messageText);
		this.setState({
			messageText: ''
		});
	};

	changeMessage = (event) => {
		let message = event.target.value;
		this.setState({
			messageText: message
		});
	};

	changeAuthorName = (event) => {
		let name = event.target.value;
		this.setState({
			author: name
		});
	};

	changeAuthorEditMode = (value) => {
		this.setState({
			authorEditMode: value
		});
	};

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.messages.length !== this.props.messages.length && this.props.messages[this.props.messages.length - 1].author !== 'BOT'){
			let botText = getBotMessage();
			this.props.addMesage('BOT', botText);
		}
	};

	render() {
		return (
			<div>
				<div>
					{
						(this.props.messages.length !== 0)
							? <Messages messages={this.props.messages}/>
							: 'Нет сообщений'
					}
				</div>
				<div>
					{
						this.state.authorEditMode
							? <input autoFocus={true} onBlur={() => {this.changeAuthorEditMode(false)}} type="text" value={this.state.author} onChange={this.changeAuthorName}/>
							: <div onDoubleClick={() => {this.changeAuthorEditMode(true)}}>{this.state.author?`Автор: ${this.state.author}`:'Нет автора'}</div>
					}
				</div>
				<div>
					<input type="text" name="text" value={this.state.messageText}
						   onChange={this.changeMessage}/>
					<button onClick={this.sendMessage}>Send</button>
				</div>
			</div>
		);
	};
}

export default MessageField;