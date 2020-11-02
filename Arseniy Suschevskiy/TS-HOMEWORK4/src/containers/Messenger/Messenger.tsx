import React from 'react'
import classes from './Messenger.module.css'
import MessageField from '../../components/MessageField/MessageField'
import ChatBox from '../../components/ChatBox/ChatBox'
import {useRouteMatch} from 'react-router-dom'

type messengerProps = {
	chats: chatType[]
	handleMessageSend: (message: messageTypeRequest, chat: number) => void
}

export interface MatchParams {
	id: string
}

const Messenger: React.FunctionComponent<messengerProps> = props => {
	const match  = useRouteMatch<MatchParams>()
	const getChat = () => {
		return props.chats.find( chat => {
			if (chat.id === +match.params.id) {
				return chat
			}
		})
	}

	const chat: chatType | undefined = getChat()
	const messages: messageTypeRequest[] | undefined = chat && chat.messages

	return (
		<div className = { classes.Messenger }>
			<section>
				<ChatBox
					messages = { messages }
				/>
				<MessageField
					onSend = { props.handleMessageSend }
				/>
			</section>
		</div>
	)
}

export default Messenger