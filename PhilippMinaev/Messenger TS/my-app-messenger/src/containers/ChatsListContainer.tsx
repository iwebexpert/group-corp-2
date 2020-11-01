import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatsList } from "../components/ChatsList";
import {
  chatsLoadAction,
  messageUnfireAction,
  chatsListSendAction,
} from "../actions/chats";
import { push } from "connected-react-router";
import { AppState } from "../reducers";

export const ChatsListContainer: React.FC = () => {
  const dispatch = useDispatch();

  const [chats, loadStatus, fireChats] = useSelector((state: AppState) => [
    state.chats.entries,
    state.chats.loadStatus,
    state.chats.fireChatsId,
  ]);

  let lastChatId = chats.length;

  useEffect(() => {
    if (!loadStatus) dispatch(chatsLoadAction());
  }, []);

  const chatAddHandler = (newchat: string) => {
    dispatch(
      chatsListSendAction({
        id: lastChatId.toString(),
        title: newchat,
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTk0936CmLeNxPOJFyot8uCx1kU27hoqS5CbA&usqp=CAU",
      })
    );
    dispatch(push(`/chats/${lastChatId}`));
  };

  const chatClickHandler = (chatId: number) => {
    if (chatId >= 0) {
      dispatch(messageUnfireAction({ chatId }));
    }
  };

  return (
    <ChatsList
      loadStatus={loadStatus}
      chats={chats}
      fireChats={fireChats}
      onAdd={chatAddHandler}
      onClick={chatClickHandler}
    />
  );
};
