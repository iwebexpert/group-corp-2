import React from 'react'
import { MessagesList } from './MessagesList'
import { MessageForm } from './MessageForm'
import { Layout, Typography, } from 'antd'
import style from './style'
import { UserOutlined } from '@ant-design/icons'

const { Header, Content } = Layout

type MessengerTypes = {
	error: boolean
	isLoading: boolean
	locationTest: string
	name: string
	messages: MessageType[]
	onSend: (message: MessageType) => void
	redirect: () => CallHistoryMethodAction<[string, unknown?]>
}

export const Messenger: React.FC<MessengerTypes> = (props) => {

	if (props.error) {
		return <div>Error</div>
	}

	if (props.isLoading) {
		return <div>Loading</div>
	}
	if (props.locationTest === '/') return <div>Создайте или выберите чат</div>

	return (
		<>
			<Content style={style.contentLayout as any}>
				<Header style={{ background: '#1890ff', display: 'flex', justifyContent: "space-between" }}>
					<Typography.Title
						level={3}
						style={style.contentLayout.contentHeader}
					>{props.name}</Typography.Title>
					<div onClick={props.redirect}><Typography.Title level={3} style={style.contentLayout.contentHeader}><UserOutlined /></Typography.Title></div>
				</Header>
				<div style={style.contentLayout.messageList as any}>
					{props.messages != null && <MessagesList items={props.messages} />}
				</div>
				<MessageForm onSend={props.onSend} />
			</Content>
		</>
	)
}