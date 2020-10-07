import React from 'react'

import List from '@material-ui/core/List';
import { ChatAdd } from './../ChatAdd';
import classNames from 'classnames'
import './ChatList.scss'
import { useHistory } from 'react-router-dom';
import removeSvg from '../../assets/img/remove.svg'
import editSvg from '../../assets/img/edit.svg'
import axios from 'axios';
export const ChatList = ({ chats, onAddChat, onClickChat, activeChat, onRemoveChat, onEditChat }) => {
  let history = useHistory();

  const onClick = (i, chat) => {
    history.push(`/chats/${i + 1}`);
    onClickChat(chat);
  }
  const onRemove = (chatId, i) => {
    if (window.confirm('Вы действительно хотите удалить чат?')) {
      i += 1;
      axios.delete(`http://localhost:3001/chats/${chatId}`).then(() => {
        onRemoveChat(chatId);
      });
      if (history.location.pathname !== '/') {
        let currentChat = history.location.pathname.split('/chats/')[1];
        currentChat = Number(currentChat);
        if (currentChat < i) {
          history.push(`/chats/${currentChat}`);
        }
        else if (currentChat === 1) {
          history.push('/');
        }
        else if (currentChat >= i) {
          currentChat -= 1;
          history.push(`/chats/${currentChat}`);
        };
      };
    };
  }
  const onEdit = (chatId) => {
    const newTitle = window.prompt('Введите название', '');
    if (newTitle) {
      axios.patch(`http://localhost:3001/chats/${chatId}`, {
        "title": newTitle
      }).then(() => {
        onEditChat(newTitle, chatId);
      })
    }
  }
  return (
    <div className='chat__lists'>
      {
        chats && chats.length ? <List component="nav" aria-label="secondary mailbox folders">
          {
            chats && chats.map((chat, i) => <li key={i + 1} className={classNames('chat__lists-item', activeChat && activeChat.id === chat.id ? 'active' : '')} >
              <p onClick={() => onClick(i, chat)}>{chat.title}</p>
              <img src={removeSvg} alt="remove-btn" className='remove-btn' onClick={() => onRemove(chat.id, i)} />
              <img src={editSvg} alt="edit-btn" className='edit-btn' onClick={() => onEdit(chat.id)} />
            </li>)
          }
        </List> : <div style={{ padding: '40px' }}>Создайте чат</div>
      }

      <ChatAdd onAddChat={onAddChat} chats={chats} />
    </div>
  )
}
