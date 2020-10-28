import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";

import { ChatsList } from "../components/ChatsList";
import {
  chatsLoadAction,
  addChatAction,
  chatUnfireAction,
  chatDeleteAction,
} from "../actions/chats";

import Swal from "sweetalert2";

export const ChatsListContainer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!chats.length) {
      dispatch(chatsLoadAction());
    }
  }, []);

  useEffect(() => {
    if (chatAddError) {
      Swal.fire({
        text:
          "Не удалось добавить новый чат. Отсутствует соединение с сервером.",
        icon: "error",
      });
    }
  });

  const chats = useSelector((state) => state.chats.entries);
  const { location } = useSelector((state) => state.router);
  const [chatAddError, isError] = useSelector((state) => [
    state.chats.chatAddError,
    state.chats.error,
  ]);

  const addChat = (chat) => {
    chat.chatId = chats.length;
    chat.messages = [];
    chat.fire = false;
    dispatch(addChatAction(chat));
    dispatch(chatsLoadAction());
    dispatch(push(`/chats/${chat.chatId}`));
  };

  const unfireChat = (chatId) => {
    dispatch(chatUnfireAction(chatId));
    dispatch(chatsLoadAction());
  };

  const deleteChat = (chatId) => {
    dispatch(chatDeleteAction(chatId));
    if (chats.length > 1) {
      dispatch(push(`/chats/${chats.length - 2}`));
    } else dispatch(push("/"));
  };

  const refreshChats = () => {
    dispatch(chatsLoadAction());
  };

  return (
    <ChatsList
      chats={chats}
      location={location}
      isError={isError}
      onAdd={addChat}
      onDelete={deleteChat}
      unfireChat={unfireChat}
      refreshChats={refreshChats}
    />
  );
};
