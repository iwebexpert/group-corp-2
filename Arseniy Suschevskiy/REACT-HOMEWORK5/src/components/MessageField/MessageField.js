import React, { Component } from 'react'
import classes from './MessageField.module.css'
import { Send } from '@material-ui/icons'

class MessageField extends Component {
	state = {
		author: '',
		text: '',
	}

	submitClickHandler = () => {
		const { onSend } = this.props
		const { text, author } = this.state

		if (!text || !author) {
			alert('You need to enter text and author name')
			return
		}

		if (typeof onSend === 'function') {
			onSend(this.state, this.props.chats[this.props.match.params.id])

			this.props.robotAnswer()

			this.setState({text: ''})
		}
	}

	inputChangeHandler = event => {
		const fieldName = event.target.name
		this.setState({[fieldName]: event.target.value})
	}

	render() {
		const { text, author } = this.state

		this.props.messages === [] && this.setState({author: ''})

		return (
			<form onSubmit = { event => event.preventDefault() }
				  className = { classes.MessageField }>

				<input
					name = 'author'
					type = 'text'
					onChange = { this.inputChangeHandler }
					value = { author }
					placeholder = 'Enter author'
				/>

				<input
					name = 'text'
					type = 'text'
					onChange = { this.inputChangeHandler }
					value = { text }
					placeholder = 'Say something nice'
				/>

				<button
					onClick = { this.submitClickHandler }
				>
					<Send fontSize = 'large' style={{ color: 'white' }}/>
				</button>

			</form>
		)

	}

}

export default MessageField

