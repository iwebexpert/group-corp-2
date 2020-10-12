import React, { Component } from 'react'
import { MessagesList } from './MessagesList'
import { MessageForm } from './MessageForm'
import { Layout, Typography, } from 'antd'
import style from './style'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'

const { Header, Content } = Layout

export class Messenger extends Component {
	render() {
		return (
			<>
				<Content style={style.contentLayout}>
					<Header style={{ background: '#1890ff', display: 'flex', justifyContent: "space-between" }}>
						<Typography.Title
							level={3}
							style={style.contentLayout.contentHeader}
						>{this.props.name}</Typography.Title>
						<Link to="/profile" style={{ color: 'white' }}><Typography.Title level={3} style={style.contentLayout.contentHeader}><UserOutlined /></Typography.Title></Link>
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