import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Route, Switch, useHistory } from "react-router-dom";

import { Header } from "./components/Header";
import "./App.scss";
import { MessangerField } from "./components/MessangerField";
import { setChats } from "./actions/setChats";
import { setProfile } from "./actions/setProfile";
import { Profile } from "./components/Profile";
import { addChat } from "./actions/addChat";
import { removeChat } from "./actions/removeChat";

const App = ({
  chats,
  setChats,
  setProfile,
  profileData,
  addChat,
  removeChat,
}) => {
  const [activeChat, setActiveChat] = useState(null);
  let history = useHistory();
  useEffect(() => {
    axios
      .get("http://localhost:3001/chats?_embed=messages")
      .then(({ data }) => {
        setChats(data);
      });
    axios.get("http://localhost:3001/profile").then(({ data }) => {
      setProfile(data);
    });
  }, [setChats, setProfile]);
  useEffect(() => {
    const chatId = history.location.pathname.split("/chats/")[1];
    if (chats) {
      const chat = chats.find((chat, i) => i + 1 === Number(chatId));
      setActiveChat(chat);
    }
  }, [history.location.pathname, chats]);

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
const mapStateToProps = ({ chats, profile, addChat }) => ({
  chats: chats.items,
  profileData: profile.profileData,
});
export default connect(mapStateToProps, {
  setChats,
  setProfile,
  addChat,
  removeChat,
})(App);
