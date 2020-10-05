import React from 'react'
import classes from './ChatBox.module.css'
import Message from './Message/Message'

const ChatBox = props => {


	return (
		<main className = { classes.ChatBox }>
			{
				props.messages.map( messageItem => (
					<Message
						key = { messageItem.id }
						text = { messageItem.text }
						author = { messageItem.author }
					/>
				))
			}
		</main>
	)

}

export default ChatBox
