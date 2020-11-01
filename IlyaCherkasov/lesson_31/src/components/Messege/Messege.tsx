import React, { memo } from 'react';

import { MessageComponentType } from '../../types'

const Messege: React.FC<MessageComponentType> = memo(({ text, author, user }) => {
  return (
    <div className={`message ${user}`}>
      <small>{author}</small>
      <p>{text}</p>
    </div>
  );
});

export default Messege;
