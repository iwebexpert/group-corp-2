import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { useParams } from 'react-router-dom';

import { Messenger } from '../components/Messenger'
import { chatsMessageSendAction } from '../actions/chats'
import { AppState } from '../reducers'


type MessengerContainerTypes = {
  location: Location
}

export const MessengerContainer: React.FC<MessengerContainerTypes> = (props) => {

  const dispatch = useDispatch()

  const chats = useSelector((state: AppState) => state.chats.entries)

  const { id } = useParams<{ id: string }>()
  let n: number = id as unknown as number
  const messages = chats[n] ? chats[n].messages : null;
  const name = chats[n] ? chats[n].name : null;

  const [isLoading, error] = useSelector((state: AppState) => [state.chats.loading, state.chats.error])

  const redirect = () => dispatch(push('/profile'))

  const handleMessageSend = (message: MessageType) => {
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