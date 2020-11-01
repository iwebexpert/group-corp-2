import React from "react";

import { MessagesList } from "../MessagesList";
import "./MessagesAdd.scss";
import { MessangerForm } from "../MessangerForm";
import { useSelector } from "react-redux";
import { MessagesType, ChatsType } from "../../../actions/chats";
import { AppState } from "../../../reducers";
type MessagesAdd = {
  messages: MessagesType[] | undefined;
  activeChat: ChatsType | null | undefined;
};
export const MessagesAdd: React.FC<MessagesAdd> = ({
  messages,
  activeChat,
}) => {
  const { pathname } = useSelector(({ router }: AppState) => router.location);
  return (
    <div className="messages__add">
      <MessagesList messages={messages} />
      {pathname !== "/" && <MessangerForm activeChat={activeChat} />}
    </div>
  );
};
