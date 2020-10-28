import React from 'react'
import classes from './Message.module.css'

const Message = props => {
	const cls = [ classes.Message ]
	cls.push(props.author === 'Robot' ? classes.received : classes.send)

	return (
		<div
			className = { cls.join(' ') }
			ref={element => { props.scrollToBottom(element) }}
		>
			<p>
				<b>{ props.author }: </b>
				{ props.text }
			</p>
		</div>
	)
}

export default Message
