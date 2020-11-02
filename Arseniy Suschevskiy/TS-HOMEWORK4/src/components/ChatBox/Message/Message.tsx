import React from 'react'
import classes from './Message.module.css'

type messageProps = {
	scrollToBottom: (element: HTMLDivElement | null) => void
	author: string
	text: string
}

const Message: React.FunctionComponent<messageProps> = props => {
	const cls = [ classes.Message ]
	cls.push(props.author === 'Robot' ? classes.received : classes.send)

	return (
		<div
			className = { cls.join(' ') }
			ref = {element => { props.scrollToBottom(element) }}
		>
			<p>
				<b>{ props.author }: </b>
				{ props.text }
			</p>
		</div>
	)
}

export default Message
