import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { useParams } from "react-router-dom";
import { AppState } from "../reducers";
import { nanoid } from "nanoid";

import { Messenger } from "../components/Messenger";
import {
  chatsLoadAction,
  chatsMessageSendAction,
  addChatAction,
} from "../actions/chats";

const manImg = "/img/man.png";

export const MessengerContainer: React.FC = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  const chats = useSelector((state: AppState) => state.chats.entries);
  const messages = chats[id] ? chats[id].messages : null;
  const title = chats[id] ? chats[id].title : null;

  const [isLoading, isError] = useSelector((state: AppState) => [
    state.chats.loading,
    state.chats.error,
  ]);

  useEffect((): void => {
    dispatch(chatsLoadAction());
  }, [dispatch]);

  const handleMessageSend = (message: MessageType): void => {
    message.id = nanoid();
    dispatch(
      chatsMessageSendAction({
        ...message,
        img: manImg,
        chatId: id,
      })
    );
  };

  const handleAddChat = (chat: NewChatType): void => {
    const lastChatId = Object.keys(chats).length;
    dispatch(
      addChatAction({
        ...chat,
        fire: false,
      })
    );
    dispatch(chatsLoadAction());
    dispatch(push(`/chats/${lastChatId}`));
  };

  const handleChatsReload = (): void => {
    dispatch(chatsLoadAction());
  };

  return (
    <Messenger
      isError={isError}
      isLoading={isLoading}
      messages={messages}
      chats={chats}
      title={title}
      handleMessageSend={handleMessageSend}
      handleAddChat={handleAddChat}
      handleChatsReload={handleChatsReload}
    />
  );
};
