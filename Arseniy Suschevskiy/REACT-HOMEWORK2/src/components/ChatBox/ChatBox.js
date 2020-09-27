import React from 'react'
import classes from './ChatBox.module.css'
import Message from './Message/Message'

const ChatBox = props => {
	const messageElements =  props.messages.map((messageItem, index) => (
		(<Message
			key = { messageItem.author + index }
			text = { messageItem.text }
			author = { messageItem.author }
		/>)
	))
	return (
		<main className = { classes.ChatBox }>
			{ messageElements }
		</main>
	)

}

export default ChatBox
