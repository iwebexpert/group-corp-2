import React from 'react';
import { Link } from 'react-router-dom';
import urlMessageBox from '../../img/chatBoxLogo.png';
import urlCross from '../../img/cross.png'

const ChatList = (props) => {
  return (
    <div className="chatlist">
      <div className="chatlist__field">
        <div className="chatlist__navbar">
          <ul component="nav">
            {props.chats.map((chat, id) => (
              <li key={id}>
                <Link to={`/chats/${id}`}>
                  <img src={props.fireChat(chat, id)} alt="чат" />
                  <p>{chat.title} </p>
                </Link>
                <img src={urlCross} alt={`del - ${id}`} onClick={props.handlerDeleteChat} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <img src={urlMessageBox} alt="mailBox" className="chatBoxLogo" />
      <div className="chatlist__add">
        <input
          placeholder="Название чата"
          label="Новый чат"
          value={props.newChatField}
          onChange={(e) => props.setNewChatField(e.target.value)}
        />
        <button onClick={props.sendNewChat}>Создать</button>
      </div>
    </div>
  );
};

export default ChatList;
