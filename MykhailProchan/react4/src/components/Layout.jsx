import React from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import { Messenger } from 'components/Messenger'
import { Layout, Typography, Menu } from 'antd'

import style from './style'
const { Sider } = Layout

const chats = [
  {
    id: 0,
    title: 'Тестовый чат',
    messages: [],
  },
  {
    id: 1,
    title: 'Рабочий чат',
    messages: [],
  },
  {
    id: 2,
    title: 'Друзья',
    messages: [],
  },
];

export class Wrap extends React.Component {
  state = {
    chats: chats
  }

  handleMessageSend = (message) => {
    this.state.chats[this.props.match.params.id].messages = this.state.chats[this.props.match.params.id].messages.concat([message])
    this.forceUpdate()
  }

  render() {
    console.log(this.state.chats[parseInt(this.props.match.params.id)])
    return <Layout style={style.mainLayout}>
      <Sider>
        <div style={style.siderLayout}>
          <Typography.Title
            level={3}
            style={style.siderLayout.siderHeaderText}
          >Комнаты</Typography.Title>
        </div>
        <Menu theme="dark" mode="inline">
          {chats.map((chat, index) => {
            return <Menu.Item
              key={chat.id}
              style={index === 0 && { marginTop: 0 }}
            >
              <Link to={`/chats/${chat.id}`}>{chat.title}</Link>
            </Menu.Item>
          })}
        </Menu>
      </Sider>
      <Switch>
        <Route exact path="/"><Redirect to="/chats/0" /></Route>
        <Route path='/chats/:id([0-9])+' render={(props) =>
          <Messenger {...props} chat={this.state.chats[parseInt(this.props.match.params.id)]} onSend={this.handleMessageSend} >АЛЛО</Messenger>
        } exact />
      </Switch>
    </Layout >
  }
}