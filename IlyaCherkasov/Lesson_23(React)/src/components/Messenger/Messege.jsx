import React, { memo } from 'react';

const Messege = memo(({ text, author, user }) => {
  return (
    <div className={`message ${user}`}>
      <p>{text}</p>
      <small>{author}</small>
    </div>
  );
});

export default Messege;
