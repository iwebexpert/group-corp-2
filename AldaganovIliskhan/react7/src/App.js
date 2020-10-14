import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import "./App.scss";

import Header from "./components/Header";
import Profile from "./components/Profile";
import { MessangerField } from "./components/MessangerField";
import { fetchChats } from "./actions/chats";
import { fetchProfile } from "./actions/profile";
import { addChatAction } from "./actions/chats";
import { sendMessageAction } from "./actions/chats";
import { removeChatAction } from "./actions/chats";
import { editChatAction } from "./actions/chats";
const App = (props) => {
  const {
    fetchChats,
    chats,
    removeChatAction,
    fetchProfile,
    pathname,
    addChatAction,
    sendMessageAction,
    editChatAction,
  } = props;
  const [activeChat, setActiveChat] = useState(null);
  useEffect(() => {
    fetchChats();
    fetchProfile();
  }, [fetchChats, fetchProfile]);
  useEffect(() => {
    const chatId = pathname.split("/chats/")[1];
    if (chats) {
      const chat = chats.find((chat, i) => i + 1 === Number(chatId));
      setActiveChat(chat);
    }
  }, [pathname, chats]);

  const onClickChat = (chat) => {
    setActiveChat(chat);
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
            removeChatAction={removeChatAction}
            addChatAction={addChatAction}
            sendMessageAction={sendMessageAction}
            editChatAction={editChatAction}
          />
        </Route>
      </Switch>
    </div>
  );
};
const mapStateToProps = ({ chats, router }) => ({
  chats: chats.items,
  pathname: router.location.pathname,
});
export default connect(mapStateToProps, {
  fetchChats,
  fetchProfile,
  addChatAction,
  sendMessageAction,
  removeChatAction,
  editChatAction,
})(App);
