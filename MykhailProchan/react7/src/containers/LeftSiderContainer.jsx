import React from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import { LeftSider } from 'components/LeftSider'
import { addChatAction, chatsLoadAction } from '../actions/chats'

export class LeftSiderContainerClass extends React.Component {
  componentDidMount() {
    if (!this.props.chats.entries.length) {
      this.props.chatsLoadAction();
    }
  }

  createRoom = (name) => {
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
    let chats
    if (!this.props.chats) {
      chats = []
    } else {
      chats = this.props.chats
    }

    const { isLoading, error } = this.props
    return <LeftSider
      isLoading={isLoading}
      onCreate={this.createRoom}
      chats={chats}
      error={error}
    />
  }
}

function mapStateToProps(state) {
  const chats = state
  return {
    ...chats,
    isLoading: state.chats.loading,
    error: state.chats.error
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