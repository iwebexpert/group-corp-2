import React, { useState } from 'react';
import classnames from 'classnames';
import './ChatList.css';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ChatItem from '../ChatItem/ChatItem';
import TextInput from '../TextInput/TextInput';

export default function ChatList(props) {
  const [searchInput, setSearchInput] = useState(''); // ''
  const [searchArray, setSearchArray] = useState([]); // ''
  const [searchClick, setSearchClick] = useState(false); // ''
  const [unreadMessage, seUnreadMessage] = useState([]); // ''

  const handleOnInputSearch = (e) => {
    setSearchInput(e.target.value);
  }

  const handleKeyDownSearch = (e) => {
    if (e.key === 'Enter') {
      if (searchInput != '') {
        searchArray([]);
        props.chats.map(data => {
          if (data.user.username == searchInput){
            // searchArray.push(data);
            searchArray([...searchArray, data]);  /// >??????????????????????????
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
        <ChatItem data={data} unread={unread} key={index}/>  // nanoid()
      );
    });
  }

  const renderChatItemSearch = (data, index) => {
    let unread = this.unreadMessage.filter(item => item.chat_id == data.chat_id).length;

    return(
      <ChatItem data={data} unread={unread} key={index}/>
    );
  }

  return(
    <List className="listScroll" className="chat__list">
      <ListItem>
        <TextInput className="chat__input" 
                    placeholder="Поиск" 
                    type="text"
                    value={searchInput}
                    onChange={handleOnInputSearch}
                    onKeyDown={handleKeyDownSearch} />
        <input className="chat__input" 
                placeholder="Поиск" 
                type="text"
                value={props.searchInput}
                onChange={handleOnInputSearch}
                onKeyDown={handleKeyDownSearch} />
      </ListItem>
      {props.chats.length ?
        (searchClick ?  
          searchArray.map((data, index) => (
            renderChatItemSearch(data, index)
        ))
        : 
          renderChatItem()
        )
      : <h4 className="chat__text">У тебя пока нет чатов</h4>}
    </List> 
  );
}