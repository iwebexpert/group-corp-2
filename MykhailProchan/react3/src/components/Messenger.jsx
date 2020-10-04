import React, { Component } from 'react'
import { MessagesList } from './MessagesList'
import MessageForm from './MessageForm'
import { Layout, Typography, Menu } from 'antd'
import style from './style'

const { Header, Content, Sider } = Layout
let timer

export class Messenger extends Component {
	state = {
		messages: []
	}

	handleMessageSend = (message) => {
		this.setState({ messages: this.state.messages.concat([message]) })
	}

	componentDidUpdate() {
		const author = this.state.messages[this.state.messages.length - 1].author

		if (author === 'BattleMech') return

		clearTimeout(timer)	//перезапуск таймера, если прилетело новое сообщение
		timer = setTimeout(() => {
			this.handleMessageSend({
				text: <><br />Привет, {author}!</>,
				author: 'BattleMech'
			})
		}, 1000)
	}


	render() {
		const { messages } = this.state
		return (
			<div>
				<Layout style={style.mainLayout}>
					<Sider>
						<div style={style.siderLayout}>
							<Typography.Title
								level={3}
								style={style.siderLayout.siderHeaderText}
							>Комнаты</Typography.Title>
						</div>
						<Menu theme="dark" mode="inline">
							<Menu.Item style={{ marginTop: 0 }} key="1">Чат 1</Menu.Item>
							<Menu.Item key="2">Чат 2</Menu.Item>
							<Menu.Item key="3">Чат 3</Menu.Item>
						</Menu>
					</Sider>
					<Content style={style.contentLayout}>
						<Header style={{ background: '#1890ff' }}>
							<Typography.Title
								level={3}
								style={style.contentLayout.contentHeader}
							>Чат с Ботом</Typography.Title>
						</Header>
						<MessagesList items={messages} />
						<MessageForm onSend={this.handleMessageSend} />
					</Content>
				</Layout>
			</div >
		)
	}
}