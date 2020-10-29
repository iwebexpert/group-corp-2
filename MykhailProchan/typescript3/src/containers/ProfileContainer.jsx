import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Profile } from '../components/ProfileTemplate'

import { profileLoadAction } from '../actions/profile'

export const ProfileContainer = (props) => {
  const dispatch = useDispatch()

  const [info, isLoading, error] = useSelector(state => [state.profile.entries, state.chats.loading, state.chats.error])

  useEffect(() => { dispatch(profileLoadAction()) }, [])

  return <Profile
    info={info}
    error={error}
    isLoading={isLoading}
  />
}