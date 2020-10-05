import React, { Component } from 'react'
import { MessagesList } from './MessagesList'
import MessageForm from './MessageForm'
import { Layout, Typography, } from 'antd'
import style from './style'
import { Link } from 'react-router-dom'

const { Header, Content } = Layout
let timer

export class Messenger extends Component {
	componentDidUpdate() {
		if (!this.props.chat.messages[0]) return

		const author = this.props.chat.messages[this.props.chat.messages.length - 1].author

		if (author === 'BattleMech') return

		clearTimeout(timer)	//перезапуск таймера, если прилетело новое сообщение
		timer = setTimeout(() => {
			this.props.onSend({
				text: <><br />Привет, {author}!</>,
				author: 'BattleMech'
			})
		}, 1000)
	}

	render() {
		console.log(this.props.chat)
		return (
			<>
				<Content style={style.contentLayout}>
					<Header style={{ background: '#1890ff', display: 'flex', justifyContent: "space-between" }}>
						<Typography.Title
							level={3}
							style={style.contentLayout.contentHeader}
						>{this.props.chat.name}</Typography.Title>
						<Link to="/profile" exact style={{ color: 'white' }}><Typography.Title level={4} style={style.contentLayout.contentHeader}>Профиль</Typography.Title></Link>
					</Header>
					<div style={style.contentLayout.messageList}>
						{this.props.chat.messages[this.props.match.params.id] && <MessagesList items={this.props.chat.messages} />}
					</div>
					<MessageForm onSend={this.props.onSend} />
				</Content>
			</>
		)
	}
}