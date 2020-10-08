import React from 'react'
import { connect } from 'react-redux'

import { LeftSider } from 'components/LeftSider'
import { addChatAction, chatsLoadAction } from '../actions/chats'

export class LeftSiderContainerClass extends React.Component {
  componentDidMount() {
    this.props.chatsLoadAction();
  }

  createRoom = (name) => {
    this.props.addChatAction({
      ...name
    })
  }

  onChangeHandler = (event) => this.setState({ newRoomName: event.target.value })

  render() {
    console.log(this.props)

    return <LeftSider
      onCreate={this.createRoom}
      chats={this.props.chats}
    />
  }
}

function mapStateToProps(state) {
  const chats = state
  console.log(state) //ПУСТО ЧЗХ
  console.log('asdasdadasdadasdasdasdasdasdasdasd')

  return {
    ...chats
  }
}

function mapDispatchToProps(dispatch) {
  return {
    chatsLoadAction: () => dispatch(chatsLoadAction()),
    addChatAction: (chat) => dispatch(addChatAction(chat))
  }
}

export const LeftSiderContainer = connect(mapStateToProps, mapDispatchToProps)(LeftSiderContainerClass)