import React from 'react'
import classes from './ChatBox.module.css'
import Message from './Message/Message'

const ChatBox = ({messages}) => {
	const scrollToBottom = element => {
		if (element) {
			element.scrollIntoView({ behavior: "smooth" })
		}
	}

	return (
		<main className = { classes.ChatBox }>
			{
				messages.map( messageItem => (
					<Message
						key = { messageItem.id }
						text = { messageItem.text }
						author = { messageItem.author }
						scrollToBottom = { scrollToBottom }
					/>
				))
			}
		</main>
	)
}

export default ChatBox
