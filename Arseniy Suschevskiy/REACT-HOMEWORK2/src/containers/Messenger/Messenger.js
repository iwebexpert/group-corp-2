import React, {Component} from 'react'
import classes from './Messenger.module.css'
import MessageField from '../../components/MessageField/MessageField'
import ChatBox from '../../components/ChatBox/ChatBox'
import Header from '../../components/Header/Header'


class Messenger extends Component {
	state = {
		messages: []
	}

	robotAnswer = () => {
		if (this.state.messages.length % 2 === 1) {
			setTimeout(() =>
					this.setState(
						{ messages: [ ...this.state.messages, {text: 'Не приставай ко мне, я робот!', author:'Robot'} ] }
						),
				1000)
		}
	}

	handleMessageSend = message => {
		this.setState({messages: this.state.messages.concat([message])})
	}

	render() {
		return (
			<div className = { classes.Messenger }>
				<Header/>

				<section>
					<ChatBox
						messages = { this.state.messages }
					/>

					<MessageField
						robotAnswer = { this.robotAnswer }
						onSend = { this.handleMessageSend }
						messages = { this.state.messages }
					/>
				</section>
			</div>
		)

	}

}

export default Messenger
