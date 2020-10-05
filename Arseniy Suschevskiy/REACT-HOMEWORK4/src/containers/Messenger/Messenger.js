import React, {Component} from 'react'
import classes from './Messenger.module.css'
import MessageField from '../../components/MessageField/MessageField'
import ChatBox from '../../components/ChatBox/ChatBox'
import {nanoid} from 'nanoid'

class Messenger extends Component {

	state = {
		lastAuthor: '',
	}

	get messages(){
		const {chats, match} = this.props

		let messages = []

		if(match && chats[match.params.id]){
			messages = chats[match.params.id].messages
		}
		return messages
	}

	robotAnswer = () => {
		if (this.state.lastAuthor !== 'Robot'){
			setTimeout(() => {
				this.handleMessageSend(
					{
						text: 'Как жаль, что я робот, и не могу поддержать твой разговор',
						author: 'Robot'
					}
				)
			}, 2000)

		}
	}

	handleMessageSend = message => {
		const {chats, match } = this.props

		const chat = chats[match.params.id]

		message.id = nanoid()
		chat.messages = this.messages.concat([message])
		chats[match.params.id] = chat

		this.setState({
			chats,
			lastAuthor: message.author
		})
	}


	render() {
		return (
			<div className = { classes.Messenger }>

				<section>

					<ChatBox
						messages = { this.messages }
					/>

					<MessageField
						robotAnswer = { this.robotAnswer }
						onSend = { this.handleMessageSend }
						messages = { this.messages }
					/>

				</section>
			</div>
		)

	}

}

export default Messenger
