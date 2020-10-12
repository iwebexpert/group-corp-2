import React from 'react'
import List from '@material-ui/core/List';
import classNames from 'classnames'
import axios from 'axios';
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import { ChatAdd } from './../ChatAdd';
import './ChatList.scss'
import removeSvg from '../../assets/img/remove.svg'
import editSvg from '../../assets/img/edit.svg'
const ChatList = ({ chats, onAddChat, onClickChat, activeChat, addChat, removeChat, push, pathname, editChat }) => {

  const onClick = (i, chat) => {
    push(`/chats/${chat.id}`);
    onClickChat(chat);
  }
  const onRemove = (chatId, i) => {
    if (window.confirm('Вы действительно хотите удалить чат?')) {
      axios.delete(`http://localhost:3001/chats/${chatId}`).then(() => {
        removeChat(chatId);
      });
      if (pathname !== '/') {
        let currentChat = pathname.split('/chats/')[1];
        currentChat = Number(currentChat);
        if (currentChat < chatId) {
          push(`/chats/${currentChat}`);
        }
        else if (currentChat === 1) {
          push('/');
        }
        else if (currentChat >= chatId) {
          currentChat -= 1;
          push(`/chats/${currentChat}`);
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
        editChat(newTitle, chatId);
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
              <small>{chat.fire === true ? '(+1)' : null}</small>
            </li>)
          }
        </List> : <div style={{ padding: '40px' }}>Создайте чат</div>
      }

      <ChatAdd onAddChat={onAddChat} chats={chats} addChat={addChat} />
    </div>
  )
}
const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
})
export default connect(mapStateToProps, { push })(ChatList)