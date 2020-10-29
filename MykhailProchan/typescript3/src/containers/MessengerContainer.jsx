import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { useParams } from 'react-router-dom';

import { Messenger } from '../components/Messenger'
import { chatsMessageSendAction } from '../actions/chats'

export const MessengerContainer = (props) => {

  const dispatch = useDispatch()

  const chats = useSelector(state => state.chats.entries)

  const { id } = useParams()
  const messages = chats[id] ? chats[id].messages : null;
  const name = chats[id] ? chats[id].name : null;

  const [isLoading, error] = useSelector(state => [state.chats.loading, state.chats.error])

  const redirect = () => dispatch(push('/profile'))

  const handleMessageSend = (message) => {
    const chatId = id
    dispatch(chatsMessageSendAction({
      ...message,
      chatId
    }))
  }

  return <Messenger
    error={error}
    isLoading={isLoading}
    messages={messages}
    name={name}
    redirect={redirect}
    onSend={handleMessageSend}
    locationTest={props.location.pathname}
  />
}