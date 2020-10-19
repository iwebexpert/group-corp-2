import React from "react"

import "./Profile.css"

export default function Profile({ profile }) {
  return (
    <div className="container">
      {{ profile } ? (
        <div>
          <h3>Profile page:</h3>
          <p>
            <strong>Name:</strong>
            &nbsp;{profile.name}
          </p>
          <p>
            <strong>Age:</strong>
            &nbsp;{profile.age}
          </p>
          <p>
            <strong>City:</strong>
            &nbsp;{profile.town}
          </p>
          <p>
            <strong>Email:</strong>
            &nbsp;{profile.email}
          </p>
        </div>
      ) : (
        <p>No user</p>
      )}
    </div>
  )
}
