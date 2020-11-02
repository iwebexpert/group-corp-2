import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { Messenger } from "../components/Messenger/Messenger";
import { useParams } from "react-router-dom";
import { chatsLoadAction, chatsMessageSendAction } from "../actions/chats";
import { profileLoadAction } from "../actions/profile";
import { AppState } from "../reducers";
import { MessageType } from "../components/Message/Message";

export const MessengerContainer: React.FC = () => {
  const dispatch = useDispatch();

  const { id } = useParams<{ id: string }>();

  const chats = useSelector((state: AppState) => state.chats.entries);
  const loadStatus = useSelector((state: AppState) => state.chats.loadStatus);
  const nameProfile = useSelector(
    (state: AppState) => state.profile.entries.name
  );

  let chatId = id ? id : null;
  let messages = chatId && chats[chatId] ? chats[chatId].messages : null;
  let title = chatId && chats[chatId] ? chats[chatId].title : null;
  let avatarChat = chatId && chats[chatId] ? chats[chatId].avatar : null;

  useEffect(() => {
    if (!chatId) {
      dispatch(profileLoadAction());
      dispatch(chatsLoadAction());
    }
  }, []);

  const handleMessageSend = (message: MessageType) => {
    dispatch(
      chatsMessageSendAction({
        ...message,
        id: nanoid(),
        chatId,
      })
    );
  };

  return (
    <Messenger
      title={title}
      nameProfile={nameProfile}
      avatarChat={avatarChat}
      messages={messages}
      loadStatus={loadStatus}
      onAdd={handleMessageSend}
    />
  );
};
