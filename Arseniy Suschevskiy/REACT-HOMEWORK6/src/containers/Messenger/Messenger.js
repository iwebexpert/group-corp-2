import React, {Component} from 'react'
import classes from './Messenger.module.css'
import MessageField from '../../components/MessageField/MessageField'
import ChatBox from '../../components/ChatBox/ChatBox'

class Messenger extends Component {

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
						onSend = { this.props.handleMessageSend }
						messages = { messages }
					/>

				</section>
			</div>
		)

	}

}

export default Messenger
