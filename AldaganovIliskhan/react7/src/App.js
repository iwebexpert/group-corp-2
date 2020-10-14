import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import { Header } from "./components/Header";
import "./App.scss";
import { MessangerField } from "./components/MessangerField";
import { setChats, fetchChats } from "./actions/chats";
import { setProfile, fetchProfile } from "./actions/profile";
import { Profile } from "./components/Profile";
import { addChat } from "./actions/chats";
import { removeChat } from "./actions/chats";
import { sendMessage } from "./actions/chats";
import { editChat } from "./actions/chats";
import { addChatAction } from "./actions/chats";
const App = (props) => {
  const {
    fetchChats,
    chats,
    addChat,
    removeChat,
    editChat,
    fetchProfile,
    profileData,
    sendMessage,
    pathname,
    isLoaded,
    addChatAction,
    isError,
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
          <Profile profileData={profileData} />
        </Route>
        <Route path="/">
          <Header
            active={Boolean(activeChat)}
            setActiveChat={setActiveChat}
            profileData={profileData}
          />
          <MessangerField
            chats={chats}
            onClickChat={onClickChat}
            activeChat={activeChat}
            sendMessage={sendMessage}
            chat={activeChat}
            editChat={editChat}
            addChat={addChat}
            removeChat={removeChat}
            isLoaded={isLoaded}
            addChatAction={addChatAction}
            isError={isError}
          />
        </Route>
      </Switch>
    </div>
  );
};
const mapStateToProps = ({ chats, profile, router }) => ({
  chats: chats.items,
  profileData: profile.profileData,
  pathname: router.location.pathname,
  isLoaded: chats.isLoaded,
  isError: chats.isError,
});
export default connect(mapStateToProps, {
  setChats,
  editChat,
  addChat,
  removeChat,
  fetchChats,
  sendMessage,
  fetchProfile,
  setProfile,
  addChatAction,
})(App);
