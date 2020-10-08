import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Main from '../../pages/Main/Main';
import { chatsLoad } from '../actions/chatActions';
import { readProfile } from '../actions/proifleAcrions';

let i = true;

const MessengerContainer = () => {
  //Загружаю чаты и лоадеры при первой загрузке страницы
  if (i) {
    const dispatch = useDispatch();
    dispatch(chatsLoad());
    dispatch(readProfile());
    i = false;
  }

  const { id } = useParams(); //Передаю параметр id
  return <Main chatID={id} />;
};

export default MessengerContainer;
