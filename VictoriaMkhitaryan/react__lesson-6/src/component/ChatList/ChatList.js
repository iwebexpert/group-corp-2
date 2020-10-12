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
    return props.chats[0] ? props.chats.map(data => {
      return(
        <ChatItem chats={data} 
                  unread={props.unreadMessage[data.id]} 
                  key={nanoid()}
                  currentChat={props.currentChat}
                  handleClickChat={props.handleClickChat}
                  handleOnClickDelete={props.handleOnClickDelete} />
      );
    }) : null;
  }

  const renderChatItemSearch = (data) => {
    return(
      <ChatItem chats={data} 
                unread={props.unreadMessage[data.id]} 
                key={nanoid()}
                currentChat={props.currentChat}
                handleClickChat={props.handleClickChat}
                handleOnClickDelete={props.handleOnClickDelete} />
    );
  };

  const handleCreateChat = (title) => {
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