import React, {Component} from 'react'
import classes from './MessageField.module.css'

class MessageField extends Component {

	state = {
		author: '',
		text: '',
	}

	componentDidUpdate() {
		this.props.robotAnswer()
	}



submitClickHandler = () => {
		const { onSend } = this.props
		const { text } = this.state

		if (!text) {
			alert('Введите текст сообщения')
			return
		}

		if (typeof onSend === 'function') {
			onSend(this.state)

			this.setState({text: ''})
		}
	}

	inputChangeHandler = event => {
		const fieldName = event.target.name
		this.setState({[fieldName]: event.target.value})
	}

	formSubmitHandler = event => {
		event.preventDefault()
	}

	render() {
		const { text, author } = this.state


		return (
			<form onSubmit = { this.formSubmitHandler } className = { classes.MessageField }>
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
					placeholder = 'say something nice'
				/>

				<button
					onClick = { this.submitClickHandler }
				>
					➡
				</button>

			</form>
		)

	}

}

export default MessageField

