import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { push } from "connected-react-router";
import { useParams } from "react-router-dom";
import { Messenger } from "../components/Messenger";
import { AppState } from "../reducers/index";

import {
  chatsLoadAction,
  chatsAddAction,
  messagesSendAction,
} from "../actions/chats";

export const MessengerContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  const chats = useSelector((state: AppState) => state.chats.entries);
  const messages = chats[id] ? chats[id].messages : null;
  const contacts = chats[id] ? chats[id].contacts : null;

  useEffect((): void => {
    dispatch(chatsLoadAction());
  }, [dispatch]);

  const [dataForm, setDataForm] = useState({
    inputValue: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDataForm({
      ...dataForm,
      inputValue: e.target.value,
    });
  };

  const handleMessageSend = (message: MessageType): void => {
    dispatch(
      messagesSendAction({
        ...message,
        id: nanoid(),
        chatId: +id,
      })
    );
  };

  const handleChatAdd = (): void => {
    const { inputValue } = dataForm;
    const title = inputValue;
    const lastChatId = Object.keys(chats).length;

    if (!title) {
      alert("Введите название чата");
    } else {
      dispatch(chatsAddAction(lastChatId, title));
      dispatch(push(`/chats/${lastChatId}`));
      setDataForm({
        ...dataForm,
        inputValue: "",
      });
    }
  };

  return (
    <Messenger
      messages={messages}
      contacts={contacts}
      handleMessageSend={handleMessageSend}
      handleChange={handleChange}
      handleChatAdd={handleChatAdd}
    />
  );
};
