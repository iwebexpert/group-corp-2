import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import { LeftSider } from '../components/LeftSider'
import { addChatAction, chatsLoadAction } from '../actions/chats'

export const LeftSiderContainer = (props) => {
  const dispatch = useDispatch();

  const chats = useSelector((state) => state.chats)

  const [isLoading, error] = useSelector((state) => [state.chats.loading, state.chats.error])

  useEffect(() => {
    if (!chats.entries == 0) {
      dispatch(chatsLoadAction())
    }
  }, [])

  const createRoom = (name) => {
    if (name === '') return

    dispatch(addChatAction({
      id: chats.entries.length,
      name,
      messages: []
    }))

    dispatch(push(`/chats/${chats.entries.length}`))
  }


  return <LeftSider
    isLoading={isLoading}
    onCreate={createRoom}
    chats={chats}
    error={error}
  />
}