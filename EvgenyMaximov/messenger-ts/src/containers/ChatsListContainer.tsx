import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { AppState } from "../reducers";

import { ChatsList } from "../components/ChatsList";
import {
  chatsLoadAction,
  addChatAction,
  chatUnfireAction,
  chatDeleteAction,
} from "../actions/chats";

import Swal from "sweetalert2";

export const ChatsListContainer:React.FC<{}> = () => {
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

  const chats = useSelector((state:AppState) => state.chats.entries);
  const [chatAddError, isError, isLoading] = useSelector((state:AppState) => [
    state.chats.chatAddError,
	 state.chats.error,
	 state.chats.loading,
  ]);

  const addChat = (chat:ChatType):void => {
    dispatch(addChatAction(chat));
    dispatch(chatsLoadAction());
    dispatch(push(`/chats/${chat.chatId}`));
  };

  const unfireChat = (chatId:number):void => {
    dispatch(chatUnfireAction(chatId));
    dispatch(chatsLoadAction());
  };

  const deleteChat = (chatId:number):void => {
    dispatch(chatDeleteAction(chatId));
    if (chats.length > 1) {
      dispatch(push(`/chats/${chats.length - 2}`));
    } else dispatch(push("/"));
  };

  const refreshChats = ():void => {
    dispatch(chatsLoadAction());
  };

  return (
    <ChatsList
      chats={chats}
		isError={isError}
		isLoading={isLoading}
      onAdd={addChat}
      onDelete={deleteChat}
      unfireChat={unfireChat}
      refreshChats={refreshChats}
    />
  );
};
