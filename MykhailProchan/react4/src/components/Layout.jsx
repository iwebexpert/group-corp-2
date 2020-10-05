import React from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import { Messenger } from 'components/Messenger'
import { Layout, Typography, Menu, Button, Modal, Input } from 'antd'

import style from './style'
const { Sider } = Layout

const chats = [
  {
    id: 0,
    name: 'Тестовый чат',
    messages: [],
  },
  {
    id: 1,
    name: 'Рабочий чат',
    messages: [],
  }
];

export class Wrap extends React.Component {
  state = {
    chats: chats,
    modalVisible: false,
    newRoomName: ''
  }

  handleMessageSend = (message) => {
    this.state.chats[this.props.match.params.id].messages = this.state.chats[this.props.match.params.id].messages.concat([message])
    this.forceUpdate()
  }

  toggleModalVisibility = () => {
    this.setState({ modalVisible: !this.state.modalVisible })
  }

  createRoom = () => {
    this.state.chats.push({
      id: this.state.chats.length,
      name: this.state.newRoomName,
      messages: []
    })
    this.toggleModalVisibility()
  }

  onChangeHandler = (event) => this.state.newRoomName = event.target.value

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
        <Menu theme="dark" style={{ height: 'calc(100% - 121px)' }}>
          {chats.map((chat, index) => {
            return <Menu.Item
              key={chat.id}
              style={index === 0 && { marginTop: 0 }}
            >
              <Link to={`/chats/${chat.id}`}>{chat.name}</Link>
            </Menu.Item>
          })}
        </Menu>
        <Button type="primary" style={{ marginLeft: '30px' }} onClick={this.toggleModalVisibility}>Создать комнату</Button>
        <Modal
          title="Создание комнаты"
          visible={this.state.modalVisible}
          onCancel={this.toggleModalVisibility}
          onOk={this.createRoom}
        >
          <Input placeholder="Введите название комнаты" onChange={this.onChangeHandler}></Input>
          <Button type="primary" htmlType="submit"></Button>
        </Modal>
      </Sider>
      <Switch>
        <Route exact path="/"><Redirect to="/chats/0" /></Route>
        <Route path='/chats/:id([0-9])+' render={(props) =>
          <Messenger {...props} chat={this.state.chats[parseInt(this.props.match.params.id)]} onSend={this.handleMessageSend} />
        } exact />
      </Switch>
    </Layout >
  }
}