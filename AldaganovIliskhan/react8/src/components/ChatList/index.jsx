import React from 'react'
import List from '@material-ui/core/List';
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'

import { ChatAdd } from './../ChatAdd';
import './ChatList.scss'
import { removeChatAction, editChatAction } from '../../actions/chats'
import removeSvg from '../../assets/img/remove.svg'
import editSvg from '../../assets/img/edit.svg'
export const ChatList = ({ chats, onClickChat, activeChat }) => {
  const dispatch = useDispatch();
  const { isChatsError, isChatsLoading } = useSelector(({ chats }) => chats);
  const onClick = (chat) => {
    if (chat.id) {
      dispatch(push(`/chats/${chat.id}`));
      onClickChat(chat);
    }

  }
  const onRemove = (chatId) => {
    if (window.confirm('Вы действительно хотите удалить чат?')) {
      dispatch(removeChatAction(chatId));
      dispatch(push('/'));
    };
  }
  const onEdit = (chatId) => {
    const newTitle = window.prompt('Введите название', '');
    if (newTitle) {
      dispatch(editChatAction(newTitle, chatId));
    }
  }

  return (
    <div className='chat__lists'>
      {
        isChatsError ? <div>Error...</div> :
          isChatsLoading ? <div>Loading...</div> :
            chats && chats.length ? <List component="nav" aria-label="secondary mailbox folders">
              {
                chats && chats.map((chat, i) => <li key={i + 1} className={classNames('chat__lists-item', activeChat && activeChat.id === chat.id ? 'active' : '')} >
                  <p onClick={() => onClick(chat)}>{chat.title}</p>
                  <img src={removeSvg} alt="remove-btn" className='remove-btn' onClick={() => onRemove(chat.id)} />
                  <img src={editSvg} alt="edit-btn" className='edit-btn' onClick={() => onEdit(chat.id)} />
                  <small>{chat.fire === true ? '(+1)' : null}</small>
                </li>)
              }
            </List> : <div style={{ padding: '40px' }}>Создайте чат</div>
      }

      <ChatAdd chats={chats} />
    </div>

  )
}
