import React, { useState } from 'react';
import classnames from 'classnames';
import './ChatList.css';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ChatItem from '../ChatItem/ChatItem';
import TextInput from '../TextInput/TextInput';
import { nanoid } from 'nanoid';

export default function ChatList(props) {
  const [searchInput, setSearchInput] = useState('');
  const [searchArray, setSearchArray] = useState([]);
  const [searchClick, setSearchClick] = useState(false);
  const [unreadMessage, seUnreadMessage] = useState([]);

  const handleOnInputSearch = (e) => {
    setSearchInput(e.target.value);
  }

  const handleKeyDownSearch = (e) => {
    if (e.key === 'Enter') {
      if (searchInput != '') {
        setSearchArray([]);
        props.chats.map(data => {
          if (data.user.username == searchInput){
            setSearchArray([...searchArray, data]);
          }
        })
        setSearchClick(true);
      } else {
        setSearchClick(false);
      }
    }
  }

  const renderChatItem = () => {
    return props.chats.map((data, index) => {
      let unread = unreadMessage.filter(item => item.chat_id == data.chat_id).length;

      return(
        <ChatItem chats={data} unread={unread} key={nanoid()}/>
      );
    });
  }

  const renderChatItemSearch = (data, index) => {
    let unread = unreadMessage.filter(item => item.chat_id == data.chat_id).length;

    return(
      <ChatItem chats={data} unread={unread} key={nanoid()}/>
    );
  }

  return(
    <List className="listScroll" className="chat__list">
      <ListItem className="chat__search">
        <TextInput modifiers="chat__input" 
                    label="Поиск" 
                    type="text"
                    value={searchInput}
                    onChange={handleOnInputSearch}
                    onKeyDown={handleKeyDownSearch} />
      </ListItem>
      {props.chats.length ?
        (searchClick ?  
          searchArray.map((data, index) => (
            renderChatItemSearch(data, nanoid())
        ))
        : 
          renderChatItem()
        )
      : <h4 className="chat__text">У тебя пока нет чатов</h4>}
    </List> 
  );
}