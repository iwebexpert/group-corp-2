import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";

import { Messenger } from "../components/Messenger";
import {
  chatsLoadAction,
  chatsMessageSendAction,
  messageDeleteAction,
  clearChatAction,
} from "../actions/chats";

export const MessengerContainer = (props) => {
  useEffect(() => {
    dispatch(chatsLoadAction());
  }, []);

  const dispatch = useDispatch();
  const { id } = useParams();

  const chats = useSelector((state) => state.chats.entries);
  const messages = chats[id] ? chats[id].messages : [];
  const chatTitle = chats[id] ? chats[id].title : null;
  const chatId = +id;

  const [isLoading, isPending] = useSelector((state) => [
    state.chats.loading,
    state.chats.pending,
  ]);

  const onMessageSend = (message) => {
    message.id = nanoid();
    const time = new Date();
    message.time = time.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour24: true,
    });

    dispatch(
      chatsMessageSendAction({
        ...message,
        chatId,
      })
    );
    dispatch(chatsLoadAction());
  };

  const onMessageDelete = (id) => {
    dispatch(messageDeleteAction(id));
    dispatch(chatsLoadAction());
  };

  const onClearChat = (chatId) => {
    dispatch(clearChatAction(chatId));
  };

  const { classform, classlist, classchattitle } = props;

  return (
    <Messenger
      chatTitle={chatTitle}
      messages={messages}
      onMessageSend={onMessageSend}
      onMessageDelete={onMessageDelete}
      onClearChat={onClearChat}
      classform={classform}
      classlist={classlist}
      classchattitle={classchattitle}
      isLoading={isLoading}
      isPending={isPending}
    />
  );
};
