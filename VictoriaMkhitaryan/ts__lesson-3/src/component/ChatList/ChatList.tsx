import React, { useState } from 'react';
import classnames from 'classnames';
import { nanoid } from 'nanoid';
import './ChatList.css';

import { ChatsData, NewChatType } from '../../types/types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'
import { ChatItem } from '../ChatItem/ChatItem';
import { TextInput } from '../TextInput/TextInput';
import { ChatForm } from '../ChatForm/ChatForm';

type ChatListType = {
  chats: ChatsData[];
  currentChat: number;
  handleAdd: (title: NewChatType) => void;
  unreadMessage: any;
  handleClickChat: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnClickDelete: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const ChatList: React.FC<ChatListType> = ({ chats, currentChat, handleAdd, unreadMessage, 
                            handleClickChat, handleOnClickDelete }) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchArray, setSearchArray] = useState<ChatsData[]>([]);
  const [searchClick, setSearchClick] = useState(false);

  const handleOnInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  }

  const handleKeyDownSearch = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      if (searchInput != '') {
        setSearchArray([]);
        chats.map(data => {
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
    return chats[0] ? chats.map(data => {
      return(
        <ChatItem chats={data} 
                  unread={unreadMessage[data.id]} 
                  key={nanoid()}
                  currentChat={currentChat}
                  handleClickChat={handleClickChat}
                  handleOnClickDelete={handleOnClickDelete} />
      );
    }) : null;
  }

  const renderChatItemSearch = (data: any) => {
    return(
      <ChatItem chats={data} 
                unread={unreadMessage[data.id]} 
                key={nanoid()}
                currentChat={currentChat}
                handleClickChat={handleClickChat}
                handleOnClickDelete={handleOnClickDelete} />
    );
  };

  const handleCreateChat = (title: NewChatType) => {
    if (title) {
      if (typeof (handleAdd) === 'function')
        handleAdd(title);
    }
  };

  return(
    <List className="chat__list">
      <div className="chat__top">
        <ListItem className="chat__search">
          <TextInput modifiers="chat__input" 
                      label="Поиск" 
                      // type="text"
                      value={searchInput}
                      onChange={handleOnInputSearch}
                      onKeyDown={handleKeyDownSearch} />
        </ListItem>
        {chats ?
          (searchClick ?  
            searchArray.map((data, index) => (
              renderChatItemSearch(data)
          ))
          : 
            renderChatItem()
          )
        : <h4 className="chat__text">У тебя пока нет чатов</h4>}
      </div>
      <ListItem className="chat__add">
        <ChatForm handleCreateChat={handleCreateChat} />
      </ListItem>
    </List> 
  );
}