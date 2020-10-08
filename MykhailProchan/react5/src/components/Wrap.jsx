import React, { useState } from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import { MessengerContainer } from 'containers/MessengerContainer'
import { Layout, Typography, Menu, Button, Modal, Input } from 'antd'

import * as chatsTemp from '../helpers/chatsData'
import style from './style'
const { Sider } = Layout

export const Wrap = (props) => {
  const [chats, setChats] = useState(chatsTemp.chats)
  const [modalVisible, setModalVisible] = useState(false)
  const [newRoomName, setNewRoomName] = useState('')

  const handleMessageSend = (message) => {
    const temp = [...chats]
    temp[props.match.params.id].messages.push(message)
    setChats(temp)
  }

  const toggleModalVisibility = () => {
    setModalVisible(!modalVisible)
  }

  const createRoom = () => {
    setChats(chats.concat({
      id: state.chats.length,
      name: state.newRoomName,
      messages: []
    }))
    toggleModalVisibility()
  }

  const onChangeHandler = (event) => setNewRoomName(event.target.value)

  return <Layout style={style.mainLayout}>
    <Sider>
      <div style={style.siderLayout}>
        <Typography.Title
          level={3}
          style={style.siderLayout.siderHeaderText}
        >Комнаты</Typography.Title>
      </div>
      <Menu theme="light" style={{ height: 'calc(100% - 106px)', border: 0 }} defaultSelectedKeys={['0']}>
        {chats.map((chat, index) => {
          return <Menu.Item
            key={chat.id}
            style={index === 0 && { marginTop: 0 }}
          >
            <Link to={`/chats/${chat.id}`}>{chat.name}</Link>
          </Menu.Item>
        })}
      </Menu>
      <div style={{ height: '42px', background: 'white' }}>
        <Button type="primary" style={{ marginLeft: '30px' }} onClick={toggleModalVisibility}>Создать комнату</Button>
      </div>
      <Modal
        title="Создание комнаты"
        visible={modalVisible}
        onCancel={toggleModalVisibility}
        onOk={createRoom}
      >
        <Input placeholder="Введите название комнаты" onChange={onChangeHandler}></Input>
        <Button type="primary" htmlType="submit"></Button>
      </Modal>
    </Sider>
    <Switch>
      <Route exact path="/"><Redirect to="/chats/0" /></Route>
      <Route path='/chats/:id([0-9])+' component={MessengerContainer} exact />
    </Switch>
  </Layout >
}

//render={(props) =><MessengerContainer {...props} chat={chats[parseInt(props.match.params.id)]} onSend={handleMessageSend} />}