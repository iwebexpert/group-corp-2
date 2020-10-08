import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import url from '../../img/chatIcon.png';
import url2 from '../../img/chatBoxLogo.png';

import { newChatAdd } from '../../redux/actions/chatActions';

const ChatList = () => {
  const chats = useSelector((state) => state.chats.entries);
  const [newChatField, setNewChatField] = useState('');
  const dispatch = useDispatch();

  const sendNewChat = () => {
    if (newChatField !== '') {
      dispatch(
        newChatAdd({
          newChatID: chats.length,
          title: newChatField,
          messages: [],
          id: chats.length,
        })
      );
    }
    setNewChatField('');
  };

  return (
    <div className="chatlist">
      <div className="chatlist__field">
        <div className="chatlist__navbar">
          <ul component="nav">
            {chats.map((chat) => (
              <li key={chat.id}>
                <Link to={`/chats/${chat.id}`}>
                  <img src={url} alt="чат" />
                  <p>{chat.title} </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <img src={url2} alt="mailBox" className="chatBoxLogo" />
      <div className="chatlist__add">
        <input
          placeholder="Название чата"
          label="Новый чат"
          value={newChatField}
          onChange={(e) => setNewChatField(e.target.value)}
        />
        <button onClick={sendNewChat}>Создать</button>
      </div>
    </div>
  );
};

export default ChatList;
