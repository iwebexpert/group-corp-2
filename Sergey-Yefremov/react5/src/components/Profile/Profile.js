import React from "react"

import "./Profile.css"

export default function Profile({ user }) {
  return (
    <div className="container">
      {{ user } ? (
        <div>
          <h3>Profile page:</h3>
          <p>
            <strong>Name:</strong>
            &nbsp;{user.name}
          </p>
          <p>
            <strong>Age:</strong>
            &nbsp;{user.age}
          </p>
          <p>
            <strong>City:</strong>
            &nbsp;{user.town}
          </p>
          <p>
            <strong>Mail:</strong>
            &nbsp;{user.email}
          </p>
        </div>
      ) : (
        <p>No users</p>
      )}
    </div>
  )
}
