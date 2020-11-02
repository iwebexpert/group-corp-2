import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { Messenger } from "components/Messenger";
import { useParams } from "react-router-dom";
import { chatsLoadAction, chatsMessageSendAction } from "../actions/chats";
import { profileLoadAction } from "../actions/profile";
import { robotLoadAction } from "../actions/robot";

export const MessengerContainer = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!chatId) {
      dispatch(profileLoadAction());
      dispatch(robotLoadAction());
      dispatch(chatsLoadAction());
    }
  });

  const { id } = useParams();

  const chats = useSelector((state) => state.chats.entries);
  const loadStatus = useSelector((state) => state.chats.loadStatus);
  const nameProfile = useSelector((state) => state.profile.entries.name);

  let chatId = id ? id : null;
  let messages = chatId && chats[chatId] ? chats[chatId].messages : null;
  let title = chatId && chats[chatId] ? chats[chatId].title : null;
  let avatarChat = chatId && chats[chatId] ? chats[chatId].avatar : null;

  const handleMessageSend = (message) => {
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
