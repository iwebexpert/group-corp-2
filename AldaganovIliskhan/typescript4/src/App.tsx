import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import "./App.scss";

import { Header } from "./components/Header";
import { Profile } from "./components/Profile";
import { MessangerField } from "./components/MessangerField";
import { fetchChats } from "./actions/chats";
import { fetchProfile } from "./actions/profile";
export const App : React.FC= () : JSX.Element => {
  const dispatch = useDispatch();
  const [activeChat, setActiveChat] = useState(null);
  const chats = useSelector(({ chats } : any) => chats.items);
  const { pathname } = useSelector(({ router } : any) => router.location);
  useEffect(() => {
    dispatch(fetchChats());
    dispatch(fetchProfile());
  }, [dispatch]);
  useEffect(() => {
    const chatId = pathname.split("/chats/")[1];
    if (chats) {
      const chat = chats.find((chat : any) => chat.id === Number(chatId));
      setActiveChat(chat);
    }
  }, [pathname, chats]);

  const onClickChat = (chat : any) => {
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
          <Header active={Boolean(activeChat)} setActiveChat={setActiveChat} />
          <MessangerField
            chats={chats}
            onClickChat={onClickChat}
            activeChat={activeChat}
            chat={activeChat}
          />
        </Route>
      </Switch>
    </div>
  );
};
