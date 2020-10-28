import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { push } from "connected-react-router";
import { useParams } from "react-router-dom";
import { Messenger } from "../components/Messenger";
import {
  chatsLoadAction,
  chatsAddAction,
  messagesSendAction,
} from "../actions/chats";

export const MessengerContainer = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const chats = useSelector((state) => state.chats.entries);
  const messages = chats[id] ? chats[id].messages : null;
  const contacts = chats[id] ? chats[id].contacts : null;

  useEffect(() => {
    dispatch(chatsLoadAction());
  }, [dispatch]);

  const [dataForm, setDataForm] = useState({
    inputValue: "",
    errorText: "",
  });

  const [showError] = useState({
    showError: false,
  });

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      inputValue: e.target.value,
    });
  };

  const handleMessageSend = (message) => {
    dispatch(
      messagesSendAction({
        ...message,
        id: nanoid(),
        chatId: id,
      })
    );
  };

  const handleChatAdd = () => {
    const { inputValue } = dataForm;
    const title = inputValue;
    const lastChatId = Object.keys(chats).length;

    if (!inputValue) {
      setDataForm({
        ...dataForm,
        errorText: "Вы забыли ввести название чата",
      });
      return;
    } else {
      setDataForm({
        ...dataForm,
        errorText: "",
      });
    }
    if (title) {
      dispatch(chatsAddAction(lastChatId, title));
      dispatch(push(`/chats/${lastChatId}`));
      setDataForm({
        ...dataForm,
        inputValue: "",
      });
    }
    setDataForm({
      ...dataForm,
      inputValue: "",
    });
  };

  return (
    <Messenger
      error={showError}
      errorText={dataForm.errorText}
      messages={messages}
      contacts={contacts}
      handleMessageSend={handleMessageSend}
      handleChange={handleChange}
      handleChatAdd={handleChatAdd}
    />
  );
};
