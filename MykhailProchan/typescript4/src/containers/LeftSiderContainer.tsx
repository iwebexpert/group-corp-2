import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import { LeftSider } from '../components/LeftSider'
import { addChatAction, chatsLoadAction } from '../actions/chats'
import { AppState } from '../reducers'

export const LeftSiderContainer = () => {
  const dispatch = useDispatch();

  const chats = useSelector((state: AppState) => state.chats)

  const [isLoading, error] = useSelector((state: AppState) => [state.chats.loading, state.chats.error])

  useEffect(() => {
    if (chats.entries.length === 0) {
      return
    } else {
      dispatch(chatsLoadAction())
    }
  }, [])

  const createRoom = (name: string) => {
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