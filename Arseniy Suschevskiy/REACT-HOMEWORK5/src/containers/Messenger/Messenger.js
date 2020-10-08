import React, {Component} from 'react'
import classes from './Messenger.module.css'
import MessageField from '../../components/MessageField/MessageField'
import ChatBox from '../../components/ChatBox/ChatBox'

class Messenger extends Component {

	robotAnswer = () => {
		if (this.props.lastAuthor !== 'Robot'){
			setTimeout(() => {
				this.props.handleMessageSend(
					{
						text: 'Как жаль, что я робот, и не могу поддержать твой разговор',
						author: 'Robot'
					},
					this.props.chats[this.props.match.params.id]
				)
			}, 2000)

		}
	}

	render() {
		const {messages} = this.props.chats[this.props.match.params.id]

		return (
			<div className = { classes.Messenger }>

				<section>

					<ChatBox
						messages = { messages }
					/>

					<MessageField
						{...this.props}
						robotAnswer = { this.robotAnswer }
						onSend = { this.props.handleMessageSend }
						messages = { messages }
					/>

				</section>
			</div>
		)

	}

}

export default Messenger
