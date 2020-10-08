import React, { useState } from 'react';
import classnames from 'classnames';
import { nanoid } from 'nanoid';
import './ChatList.css';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'
import ChatItem from '../ChatItem/ChatItem';
import TextInput from '../TextInput/TextInput';
import ChartForm from '../ChatForm/ChatForm';

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
          if (data.title == searchInput){
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
    console.log(props.chats);
    return props.chats[0] ? props.chats.map(data => {
      // let unread = unreadMessage.filter(item => item.chat_id == data.chat_id).length;
      let unread = false;

      return(
        <ChatItem chats={data} 
                  unread={unread} 
                  key={nanoid()}
                  currentChat={props.currentChat}/>
      );
    }) : null;
  }

  const renderChatItemSearch = (data) => {
    // let unread = unreadMessage.filter(item => item.chat_id == data.chat_id).length;
    let unread = false;

    return(
      <ChatItem chats={data} unread={unread} key={nanoid()}/>
    );
  };

  const handleCreateChat = (title) => {
    // console.log('!!!!!!');
    const { handleAdd } = props;
    if (title) {
      if (typeof (handleAdd) === 'function')
        handleAdd(title);
    }
  };

  return(
    <List className="listScroll" className="chat__list">
      <div className="chat__top">
        <ListItem className="chat__search">
          <TextInput modifiers="chat__input" 
                      label="Поиск" 
                      type="text"
                      value={searchInput}
                      onChange={handleOnInputSearch}
                      onKeyDown={handleKeyDownSearch} />
        </ListItem>
        {props.chats ?
          (searchClick ?  
            searchArray.map((data, index) => (
              renderChatItemSearch(data, nanoid())
          ))
          : 
            renderChatItem()
          )
        : <h4 className="chat__text">У тебя пока нет чатов</h4>}
      </div>
      <ListItem className="chat__add">
        <ChartForm handleCreateChat={handleCreateChat} />
      </ListItem>
    </List> 
  );
}