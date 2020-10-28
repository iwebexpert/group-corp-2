import React, { useState } from 'react'
import classes from './MessageField.module.css'
import { Send } from '@material-ui/icons'

const MessageField = props => {
	const initialFormData = {
		text: '',
		author: ''
	}
	const [formData, setFormData] = useState(initialFormData)
	const { text, author } = formData

	const submitClickHandler = () => {
		if (!text || !author) {
			alert('You need to enter text and author name')
			return
		}
		props.onSend(formData, props.match.params.id)
		setFormData({
			...formData,
			text: ''
		})
	}

	const inputChangeHandler = event => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value
		})
	}

	props.messages === [] && setFormData(initialFormData)

	return (
		<form onSubmit = { event => event.preventDefault() }
			  className = { classes.MessageField }>

			<input
				name = 'author'
				type = 'text'
				onChange = { inputChangeHandler }
				value = { author }
				placeholder = 'Enter author'
			/>

			<input
				name = 'text'
				type = 'text'
				onChange = { inputChangeHandler }
				value = { text }
				placeholder = 'Say something nice'
			/>

			<button
				onClick = { submitClickHandler }
			>
				<Send fontSize = 'large' style={{ color: 'white' }}/>
			</button>

		</form>
	)
}

export default MessageField

