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

export const ChatsListContainer = () => {
  useEffect(() => {
    if (!chats.length) {
      dispatch(chatsLoadAction());
    }
  }, []);

  const dispatch = useDispatch();

  const chats = useSelector((state) => state.chats.entries);
  const { location } = useSelector((state) => state.router);

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

  return (
    <ChatsList
      chats={chats}
      location={location}
      onAdd={addChat}
      onDelete={deleteChat}
      unfireChat={unfireChat}
    />
  );
};
