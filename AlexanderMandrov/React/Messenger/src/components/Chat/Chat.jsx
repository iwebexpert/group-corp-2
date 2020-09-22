import React from 'react';
import './Chat.scss';
import Message from '../Message';

const Chat = ({ messageList, deleteMessage }) => {
  return (
    <ul className="list-group">
      {messageList.map(message => {
        return (
          <li className="list-group-item d-flex justify-content-between" key={message.id}>
            <Message message={message} deleteMessage={deleteMessage} />
          </li>
        );
      })}
    </ul>
  );
};

export default Chat;