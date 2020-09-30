import React from 'react';

export default function Messege({ text, author, user }) {
  return (
    <div className={`message ${user}`}>
      <p>{text}</p>
      <small>{author}</small>
    </div>
  );
}
