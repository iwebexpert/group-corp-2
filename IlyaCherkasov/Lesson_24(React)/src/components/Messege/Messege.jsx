import React, { memo } from 'react';

const Messege = memo(({ text, author, user }) => {
  return (
    <div className={`message ${user}`}>
      <small>{author}</small>
      <p>{text}</p>
    </div>
  );
});

export default Messege;
