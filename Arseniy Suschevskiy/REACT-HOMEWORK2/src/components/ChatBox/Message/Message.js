import React from 'react'
import classes from './Message.module.css'

const Message = props => {

	const cls = [classes.Message]

	if (props.author === 'Robot') {
		cls.push(classes.received)
	} else {
		cls.push(classes.send)
	}

	return (
		<div className = { cls.join(' ') }>
			<p>
				<b>{ props.author }: </b>{ props.text }
			</p>
		</div>
	)
}

export default Message
