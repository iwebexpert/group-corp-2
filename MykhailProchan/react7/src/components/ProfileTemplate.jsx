import React from 'react'

export const Profile = (props) => {
  const { id, name, email } = props.info
  if (props.error) {
    return <div>Error</div>
  }

  if (props.isLoading) {
    return <div>Loading</div>
  }

  return <div>Id: {id}, Name: {name}, Email: {email}</div>
}