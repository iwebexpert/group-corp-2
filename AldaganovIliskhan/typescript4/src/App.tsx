import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import "./App.scss";

import { Header } from "./components/Header";
import { Profile } from "./components/Profile";
import { MessangerField } from "./components/MessangerField";
import { ChatsType, fetchChats } from "./actions/chats";
import { fetchProfile } from "./actions/profile";
import { AppState } from "./reducers";
export const App: React.FC = () => {
  const dispatch = useDispatch();
  const chats = useSelector(({ chats }: AppState) => chats.items);
  const [activeChat, setActiveChat] = useState<ChatsType | null | undefined>(
    null
  );
  const { pathname } = useSelector(({ router }: AppState) => router.location);
  useEffect(() => {
    dispatch(fetchChats());
    dispatch(fetchProfile());
  }, [dispatch]);
  useEffect(() => {
    const chatId = pathname.split("/chats/")[1];
    if (chats) {
      const chat: ChatsType | undefined = chats.find(
        (chat: ChatsType) => chat.id === Number(chatId)
      );
      setActiveChat(chat);
    }
  }, [pathname, chats]);

  const onClickChat = (chat: ChatsType) => {
    if (chat.id) {
      setActiveChat(chat);
    }
  };

  return (
    <div className="messanger">
      <Switch>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route path="/">
          <Header active={Boolean(activeChat)} />
          <MessangerField
            chats={chats}
            onClickChat={onClickChat}
            activeChat={activeChat}
          />
        </Route>
      </Switch>
    </div>
  );
};
