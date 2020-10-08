import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import Messege from '../Messege/Messege';
import MessageForm from '../MessageForm';

const Messenger = memo(({ chatID }) => {
  const chats = useSelector((state) => state.chats.entries);
  let messages;
  if (chats[chatID] !== undefined) {
    messages = chats[chatID].messages;
  }
  if (messages !== undefined) {
    return (
      <div className="messanger">
        <div className="Messanger_field">
          {messages.map((message) => (
            <Messege
              author={message.author}
              text={message.text}
              user={message.user}
              key={message.id}
            />
          ))}
        </div>
        <MessageForm chatID={chatID} classN="Messanger_form" />
      </div>
    );
  }
  return (
    <div className="messanger">
      <div className="Messanger_field_full">
        <h2>Выберите чат</h2>
      </div>
      <MessageForm classN="Messanger_form_No" />
    </div>
  );
});

export default Messenger;
