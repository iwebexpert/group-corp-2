import React, { useState } from 'react';
import './App.scss';
import CreateMessage from '../CreateMessage';
import Chat from '../Chat';
import { db, createMessage } from '../../constants/constants';

const App = () => {
  const [messageList, setMessageList] = useState(db);

  const deleteMessage = (id) => {
    setMessageList(messageList.filter(item => item.id !== id));
  };

  const pushMessage = (message) => {
    setMessageList([...messageList, createMessage(message)])
  };

  return (
    <div className="App container mt-5 w-50">
      <div className="card border-dark">
        <div className="card-header">Username</div>
        <div className="card-body">
          <h4 className="card-title text-dark">Chat</h4>
          <Chat messageList={messageList} deleteMessage={deleteMessage} />
        </div>
        <CreateMessage pushMessage={pushMessage}/>
      </div>
    </div>
  );
};

export default App;