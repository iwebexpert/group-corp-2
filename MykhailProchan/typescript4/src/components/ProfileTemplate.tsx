import React from 'react'

type ProfileTypes = {
  error: boolean
  isLoading: boolean
  info: {
    id: number
    name: string
    email: string
  }
}

export const Profile = (props: ProfileTypes) => {
  const { id, name, email } = props.info
  if (props.error) {
    return <div>Error</div>
  }

  if (props.isLoading) {
    return <div>Loading</div>
  }

  return <div>Id: {id}, Name: {name}, Email: {email}</div>
}