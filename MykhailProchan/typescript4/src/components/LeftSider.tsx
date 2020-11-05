import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Typography, Menu, Button, Modal, Input } from 'antd'
import style from './style'

const { Sider } = Layout

type LeftSiderTypes = {
  onCreate: (arg0: string) => void
  error: boolean
  isLoading: boolean
  chats: { entries: ChatType[] }
}

export const LeftSider: React.FC<LeftSiderTypes> = (props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [newRoomName, setNewRoomName] = useState('')

  const toggleModalVisibility = () => {
    setModalVisible(!modalVisible)
  }

  const createRoom = () => {
    props.onCreate(newRoomName)
    toggleModalVisibility()
  }

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => setNewRoomName(event.target.value)

  if (props.error) {
    return <div>Error</div>
  }

  if (props.isLoading) {
    return <div>Loading</div>
  }

  return <Sider>
    <div style={style.siderLayout as any}>
      <Typography.Title
        level={3}
        style={style.siderLayout.siderHeaderText}
      >Комнаты</Typography.Title>
    </div>
    <Menu theme="light" style={{ height: 'calc(100% - 106px)', border: 0 }} defaultSelectedKeys={['0']}>
      {props.chats.entries[0] &&
        props.chats.entries.map((chat: ChatType, index: number) => {
          return <Menu.Item
            key={chat.id}
            style={index === 0 && { marginTop: 0 } as any}
          >
            <Link to={`/chats/${chat.id}`}>{chat.name} {chat.fire ? '*' : '-'}</Link>
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