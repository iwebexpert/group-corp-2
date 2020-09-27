import React from 'react';

export default function Messege({ text, author }) {
  return (
    <p>
      <b>{author}</b>: {text}
    </p>
  );
}
