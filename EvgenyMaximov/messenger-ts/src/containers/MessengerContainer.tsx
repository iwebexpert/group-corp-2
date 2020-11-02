import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AppState } from "../reducers";

import { Messenger } from "../components/Messenger";
import {
  chatsLoadAction,
  chatsMessageSendAction,
  messageDeleteAction,
  clearChatAction,
} from "../actions/chats";

import Swal from "sweetalert2";


type MessengerContainerPropsType = {
	classform: string, 
	classlist: string, 
	classchattitle: string,
};

export const MessengerContainer:React.FC<MessengerContainerPropsType> = ({ classform, classlist, classchattitle }) => {
  useEffect(() => {
    if (!chats) {
      dispatch(chatsLoadAction());
    }
  }, []);

  useEffect(() => {
    if (messageSendError) {
      Swal.fire({
        text:
          "Не удалось отправить сообщение. Отсутствует соединение с сервером.",
        icon: "error",
      });
    }
  });

  const dispatch = useDispatch();
  const { id } = useParams<{id:string}>();

  const chats = useSelector((state:AppState) => state.chats.entries);
  const messages = chats[+id] ? chats[+id].messages : [];
  const chatTitle = chats[+id] ? chats[+id].title : null;
  const chatId = +id;

  const [isLoading, isPending, messageSendError] = useSelector((state:AppState) => [
    state.chats.loading,
    state.chats.pending,
    state.chats.messageSendError,
  ]);

  const onMessageSend = (message:MessageType):void => {
    dispatch(
      chatsMessageSendAction({
        ...message,
        chatId,
      })
    );
    dispatch(chatsLoadAction());
  };

  const onMessageDelete = (id:string):void => {
    dispatch(messageDeleteAction(id));
    dispatch(chatsLoadAction());
  };

  const onClearChat = (chatId:number):void => {
    dispatch(clearChatAction(chatId));
  };

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
