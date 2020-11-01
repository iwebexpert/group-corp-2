import React, { useState } from 'react'
import classes from './MessageField.module.css'
import { Send } from '@material-ui/icons'
import {useRouteMatch} from 'react-router-dom'

type MessageFieldType = {
	onSend: (message: messageTypeRequest, chat: number) => void
}

export interface MatchParams {
	id: string
}

const MessageField: React.FunctionComponent<MessageFieldType> = ({onSend}) => {
	const match = useRouteMatch<MatchParams>()
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
		onSend(formData, +match.params.id)
		setFormData({
			...formData,
			text: ''
		})
	}

	const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value
		})
	}

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
};

export default MessageField