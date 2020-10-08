import React, { Component } from 'react'
import { MessagesList } from './MessagesList'
import { MessageForm } from './MessageForm'
import { Layout, Typography, } from 'antd'
import style from './style'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'

const { Header, Content } = Layout
let timer

export class Messenger extends Component {
	componentDidUpdate() {
		if (!this.props.messages[0]) return

		const author = this.props.messages[this.props.messages.length - 1].author

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
		//console.log(this.props)
		return (
			<>
				<Content style={style.contentLayout}>
					<Header style={{ background: '#1890ff', display: 'flex', justifyContent: "space-between" }}>
						<Typography.Title
							level={3}
							style={style.contentLayout.contentHeader}
						>{this.props.name}</Typography.Title>
						<Link to="/profile" exact style={{ color: 'white' }}><Typography.Title level={3} style={style.contentLayout.contentHeader}><UserOutlined /></Typography.Title></Link>
					</Header>
					<div style={style.contentLayout.messageList}>
						{this.props.messages != null && <MessagesList items={this.props.messages} />}
					</div>
					<MessageForm onSend={this.props.onSend} />
				</Content>
			</>
		)
	}
}