import React, { useState, useEffect } from 'react';
import './Message.scss';

const Message = ({ message, deleteMessage }) => {
  const [isBot, setIsBot] = useState(false);
  const { text, date, id, username } = message;

  useEffect(() => {
    const timeout = setTimeout(() => setIsBot(true), 1000);
    return () => clearTimeout(timeout)
  }, [message])

  const renderBotMessage = (
    <p className="text-warning mb-0">
      <span className="text-primary">
        {'⊂(✾◕ ‿ ◕✾)つ•٠· '}
      </span>
      {`${username} said: `}
      <span className="text-danger">
        {text}
      </span>
    </p>
  );

  return (
    <>
      <div className="mt-1">
        <p className="text-secondary mb-0">{date}</p>
        <p className="card-text text-primary mb-1">{text}</p>
        { isBot ? renderBotMessage : null }
      </div>
      <span className="btn-group float-right">
        <button type="button" className="btn btn-outline-danger btn-sm my-2" onClick={() => deleteMessage(id)}>
          Delete
        </button>
      </span>
    </>
  );
};

export default Message;