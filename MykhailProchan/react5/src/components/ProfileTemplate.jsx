import React from 'react'
import { Link } from 'react-router-dom'

export const Profile = (props) => {
  return <div>
    <Link to='/' exact>{props.info}</Link>
  </div>
}