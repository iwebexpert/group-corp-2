import React from 'react'
import classes from './ChatBox.module.css'
import Message from './Message/Message'

type ChatBoxType = {
	messages: messageTypeRequest[] | undefined
}

const ChatBox: React.FunctionComponent<ChatBoxType> = ({messages}) => {
	const scrollToBottom = (element: HTMLDivElement | null) => {
		if (element) {
			element.scrollIntoView({ behavior: "smooth" })
		}
	}

	return (
		<main className = { classes.ChatBox }>
			{
				messages
				&& messages.map( messageItem => (
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
