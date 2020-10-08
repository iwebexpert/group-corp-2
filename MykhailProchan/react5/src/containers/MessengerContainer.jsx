import React from 'react'
import { connect } from 'react-redux'

import { Messenger } from 'components/Messenger'
import { chatsLoadAction, chatsMessageSendAction } from '../actions/chats'

class MessengerContainerClass extends React.Component {
  componentDidMount() {
    this.props.chatsLoadAction();
  }

  handleMessageSend = (message) => {
    const chatId = this.props.match.params.id
    this.props.chatsMessageSendAction({
      ...message,
      chatId
    })
  }

  render() {
    return <Messenger messages={this.props.messages} name={this.props.name} onSend={this.handleMessageSend} />
  }
}

function mapStateToProps(state, ownProps) {
  const chats = state.chats.entries
  const { match } = ownProps

  let messages = null
  let name = null

  if (match && chats[match.params.id]) {
    messages = chats[match.params.id].messages
  }

  if (match && chats[match.params.id]) {
    name = chats[match.params.id].name
  }

  return {
    messages,
    name
  }
}

function mapDispatchToProps(dispatch) {
  return {
    chatsLoadAction: () => dispatch(chatsLoadAction()),
    chatsMessageSendAction: (message) => dispatch(chatsMessageSendAction(message))
  }
}

export const MessengerContainer = connect(mapStateToProps, mapDispatchToProps)(MessengerContainerClass)