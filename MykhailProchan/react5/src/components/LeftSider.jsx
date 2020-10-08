import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Typography, Menu, Button, Modal, Input } from 'antd'
import style from './style'

const { Sider } = Layout

export const LeftSider = (props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [newRoomName, setNewRoomName] = useState('')

  const toggleModalVisibility = () => {
    setModalVisible(!modalVisible)
  }

  const createRoom = () => {
    props.onCreate(newRoomName)
    toggleModalVisibility()
  }

  const onChangeHandler = (event) => setNewRoomName(event.target.value)

  console.log(props)

  return <Sider>
    <div style={style.siderLayout}>
      <Typography.Title
        level={3}
        style={style.siderLayout.siderHeaderText}
      >Комнаты</Typography.Title>
    </div>
    <Menu theme="light" style={{ height: 'calc(100% - 106px)', border: 0 }} defaultSelectedKeys={['0']}>
      {props.chats.entries[0] &&
        props.chats.entries.map((chat, index) => {
          console.log(chat)
          return <Menu.Item
            key={chat.id}
            style={index === 0 && { marginTop: 0 }}
          >
            <Link to={`/chats/${chat.id}`}>{chat.name}</Link>
          </Menu.Item>
        })
      }
    </Menu>
    <div style={{ height: '42px', background: 'white' }}>
      <Button type="primary" style={{ marginLeft: '30px' }} onClick={toggleModalVisibility}>Создать комнату</Button>
    </div>
    <Modal
      title="Создание комнаты"
      visible={modalVisible}
      onOk={createRoom}
    >
      <Input placeholder="Введите название комнаты" onChange={onChangeHandler}></Input>
      <Button type="primary" htmlType="submit"></Button>
    </Modal>
  </Sider>
}