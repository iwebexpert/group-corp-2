import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Main from '../../pages/Main/Main';
import { chatsLoadAction } from '../actions/chatActions';
import { profileLoadAction } from '../actions/profileActions';

import { DefaultChatsRootState, ChatsType } from '../../types'

const MessengerContainer: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const chats: ChatsType[] = useSelector((state: DefaultChatsRootState) => state.chats.entries);
  if (!chats.length) {
    dispatch(chatsLoadAction());
    dispatch(profileLoadAction());
  }
  return <Main />;
}

export default MessengerContainer;