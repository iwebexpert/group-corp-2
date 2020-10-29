import React from 'react'
import { MessagesList } from './MessagesList'
import { MessageForm } from './MessageForm'
import { Layout, Typography, } from 'antd'
import style from './style'
import { UserOutlined } from '@ant-design/icons'

const { Header, Content } = Layout

export const Messenger = (props) => {

	if (props.error) {
		return <div>Error</div>
	}

	if (props.isLoading) {
		return <div>Loading</div>
	}
	if (props.locationTest === '/') return <div>Создайте или выберите чат</div>

	return (
		<>
			<Content style={style.contentLayout}>
				<Header style={{ background: '#1890ff', display: 'flex', justifyContent: "space-between" }}>
					<Typography.Title
						level={3}
						style={style.contentLayout.contentHeader}
					>{props.name}</Typography.Title>
					<Typography.Title level={3} style={style.contentLayout.contentHeader} onClick={props.redirect} ><UserOutlined /></Typography.Title>
				</Header>
				<div style={style.contentLayout.messageList}>
					{props.messages != null && <MessagesList items={props.messages} />}
				</div>
				<MessageForm onSend={props.onSend} />
			</Content>
		</>
	)
}