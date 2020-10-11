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

const App = (props) => {
  const {
    chats,
    setChats,
    addChat,
    removeChat,
    fetchChats,
    fetchProfile,
    profileData,
    pathname,
  } = props;
  const [activeChat, setActiveChat] = useState(null);

  useEffect(() => {
    fetchChats();
    fetchProfile();
  }, [fetchChats, fetchProfile]);
  useEffect(() => {
    const chatId = pathname.split("/chats/")[1];
    if (pathname === "/") {
      return;
    }
    if (chats) {
      const chat = chats.find((chat, i) => i + 1 === Number(chatId));
      setActiveChat(chat);
    }
  }, [pathname, chats]);

  const onEditChat = (newTitle, chatId) => {
    const newChats =
      chats &&
      chats.map((chat) => {
        if (chat.id === chatId) {
          chat.title = newTitle;
        }
        return chat;
      });
    setChats(newChats);
  };
  const onClickChat = (chat) => {
    setActiveChat(chat);
  };
  const onAddMessage = (obj, chatId) => {
    const newMessage = chats.map((chat) => {
      if (chatId === chat.id) {
        chat.messages = [...chat.messages, obj];
      }
      return chat;
    });
    setChats(newMessage);
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
            onAddMessage={onAddMessage}
            chat={activeChat}
            onEditChat={onEditChat}
            addChat={addChat}
            removeChat={removeChat}
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
});
export default connect(mapStateToProps, {
  setChats,
  setProfile,
  addChat,
  removeChat,
  fetchChats,
  fetchProfile,
})(App);
