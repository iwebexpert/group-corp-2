import React from 'react'
import classes from './Messenger.module.css'
import MessageField from '../../components/MessageField/MessageField'
import ChatBox from '../../components/ChatBox/ChatBox'

const Messenger = props => {

	const {messages} = props.chats.find( chat => {
		if (chat.id == props.match.params.id) {
			return chat
		}
	})

	return (
		<div className = { classes.Messenger }>
			<section>
				<ChatBox
					messages = { messages }
				/>
				<MessageField
					{ ...props }
					onSend = { props.handleMessageSend }
					messages = { messages }
				/>
			</section>
		</div>
	)
}

export default Messenger
