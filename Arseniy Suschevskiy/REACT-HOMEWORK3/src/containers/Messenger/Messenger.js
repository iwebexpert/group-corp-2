import React, {Component} from 'react'
import classes from './Messenger.module.css'
import MessageField from '../../components/MessageField/MessageField'
import ChatBox from '../../components/ChatBox/ChatBox'
import HeaderChat from '../../components/HeaderChat/HeaderChat'

class Messenger extends Component {
	state = {
		messages: []
	}

	robotAnswer = () => {
		if (this.state.messages.length % 2 === 1) {

			setTimeout(() => {
				if (this.state.messages[this.state.messages.length - 1 ].author === 'Robot'){
					return
				}
				this.setState(
				{ messages: [ ...this.state.messages, {text: 'Как жаль, что я робот, и не могу поддержать твой разговор', author:'Robot'} ] }
				)
			}, 3000)

		}
	}

	handleMessageSend = message => {
		this.setState({messages: this.state.messages.concat([message])})
	}

	render() {
		return (
			<div className = { classes.Messenger }>
				<HeaderChat/>

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
