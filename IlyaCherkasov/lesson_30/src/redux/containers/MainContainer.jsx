import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Main from '../../pages/Main/Main';
import { chatsLoadAction } from '../actions/chatActions';
import { profileLoadAction } from '../actions/profileActions';

const MessengerContainer = () => {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats.entries);
  if (!chats.length) {
    dispatch(chatsLoadAction());
    dispatch(profileLoadAction());
  }
  return <Main />;
}

export default MessengerContainer;