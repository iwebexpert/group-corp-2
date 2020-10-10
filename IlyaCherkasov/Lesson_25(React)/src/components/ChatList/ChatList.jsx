import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router'

import urlChat from '../../img/chatIcon.png';
import urlNewMessageChat from '../../img/chatIconNewM.png';
import url2 from '../../img/chatBoxLogo.png';

import { newChatAdd } from '../../redux/actions/chatActions';

const ChatList = () => {
  const chats = useSelector((state) => state.chats.entries);
  const dispatch = useDispatch()

  const [newChatField, setNewChatField] = useState('');

  const sendNewChat = () => {
    if (newChatField !== '') {
      dispatch(
        newChatAdd({
          newChatID: chats.length,
          title: newChatField,
          id: chats.length,
          messages: [],
        })
      );
      dispatch(push(`/chats/${chats.length}`))
    }
    setNewChatField('');
  };

  const fireChat = (chat) => {
    if (!chat.fire) {
      return urlChat
    } else {
      return urlNewMessageChat
    }
  }

  return (
    <div className="chatlist">
      <div className="chatlist__field">
        <div className="chatlist__navbar">
          <ul component="nav">
            {chats.map((chat) => (
              <li key={chat.id}>
                <Link to={`/chats/${chat.id}`}>
                  <img src={fireChat(chat)} alt="чат" />
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
