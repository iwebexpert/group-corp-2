import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Main from '../../pages/Main/Main';
import { chatsLoad } from '../actions/chatActions';
import { readProfile } from '../actions/proifleAcrions';

let i = true;

const MessengerContainer = () => {
  //Загружаю чаты и лоадеры при первой загрузке страницы
  if (i) {
    const dispatch = useDispatch();
    const chats = useSelector((state) => state.chats.entries);
    if (!chats.length) {
      dispatch(chatsLoad());
      dispatch(readProfile());
    }
    i = false;
  }

  const { id } = useParams(); //Передаю параметр id
  return <Main chatID={id} />;
};

export default MessengerContainer;
