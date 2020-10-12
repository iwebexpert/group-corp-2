import React from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import { LeftSider } from 'components/LeftSider'
import { addChatAction, chatsLoadAction } from '../actions/chats'

export class LeftSiderContainerClass extends React.Component {
  componentDidMount() {
    if (!this.props.chats.length) {
      this.props.chatsLoadAction();
    }
  }

  createRoom = (name) => {
    console.log(this.props)
    if (name === '') return

    this.props.addChatAction({
      id: this.props.chats.entries.length,
      name,
      messages: []
    })

    this.props.redirect(this.props.chats.entries.length)
  }

  onChangeHandler = (event) => this.setState({ newRoomName: event.target.value })

  render() {
    return <LeftSider
      onCreate={this.createRoom}
      chats={this.props.chats}
    />
  }
}

function mapStateToProps(state) {
  const chats = state
  return {
    ...chats
  }
}

function mapDispatchToProps(dispatch) {
  return {
    chatsLoadAction: () => dispatch(chatsLoadAction()),
    addChatAction: (chat) => dispatch(addChatAction(chat)),
    redirect: (chatId) => dispatch(push(`/chats/${chatId}`))
  }
}

export const LeftSiderContainer = connect(mapStateToProps, mapDispatchToProps)(LeftSiderContainerClass)