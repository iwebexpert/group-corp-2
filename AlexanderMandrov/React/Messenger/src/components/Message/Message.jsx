import React from 'react';
import './Message.scss';

const Message = ({ message, deleteMessage }) => {
  const { text, date, id } = message;
  return (
    <>
      <div className="mt-1">
        <p className="text-secondary mb-0">{date}</p>
        <p className="card-text text-primary">{text}</p>
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