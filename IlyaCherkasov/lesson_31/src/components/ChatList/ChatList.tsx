import React from 'react';
import { Link } from 'react-router-dom';
import urlMessageBox from '../../img/chatBoxLogo.png';
import urlCross from '../../img/cross.png'

import { ChatListComponentType } from '../../types'

const ChatList: React.FC<ChatListComponentType> = (props) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (props.setNewChatField) {
      props.setNewChatField(e.target.value)
    }
  }

  if (props.isError === true) {
    return (
      <div className="chatlist">
        <div className="chatlist__field">
          <div className="chatlist__navbar">
            <div className="isLoading">
              <h2>Error</h2>
              <button onClick={props.handlerReloadChat}>Попробовать снова</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  if (props.isLoading === true) {
    return (
      <div className="chatlist">
        <div className="chatlist__field">
          <div className="chatlist__navbar">
            <div className="isLoading">
              <h2>CHATS LOADING...</h2>
              <p>PLEASE STAND BY</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="chatlist">
      <div className="chatlist__field">
        <div className="chatlist__navbar">
          <ul>
            {props.chats
              ? props.chats.map((chat, id) => (
                <li key={id}>
                  <Link to={`/chats/${id}`}>
                    {props.fireChat !== undefined
                      ? <img src={props.fireChat(chat, id)} alt="чат" />
                      : <p>Новое сообщение в чате</p>}
                    <p>{chat.title} </p>
                  </Link>
                  <img src={urlCross} alt={`del - ${id}`} onClick={props.handlerDeleteChat} />
                </li>
              ))
              : <p>Что-то пошло не так</p>}
          </ul>
        </div>
      </div>
      <img src={urlMessageBox} alt="mailBox" className="chatBoxLogo" />
      <div className="chatlist__add">
        <input
          placeholder="Название чата"
          value={props.newChatField}
          onChange={handleChange}
        />
        <button onClick={props.sendNewChat}>Создать</button>
      </div>
    </div>
  );
};

export default ChatList;
