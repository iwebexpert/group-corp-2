import React, { useState } from "react";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import classNames from "classnames";

import { ChatsList } from "../components/ChatsList/ChatsList";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header/Header";
import { AppRoater } from "../components/AppRoater/AppRoater";
import { chats } from "./helpers/chatsData";

import "./App.scss";

export const App = (props) => {
  const [state, setState] = useState({
    isDark: false,
  });

  const [list, updList] = useState(chats);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const addChat = (chat) => {
    chat.id = list.length;
    chat.messages = [];
    updList([...list, chat]);
  };

  const classHeader = classNames("header", {
    "header-light": state.isDark === false,
    "header-dark": state.isDark === true,
  });

  const classHomePage = classNames("home-page", {
    "home-page-light": state.isDark === false,
    "home-page-dark": state.isDark === true,
  });

  const classMessenger = classNames("messenger", {
    "messenger-light": state.isDark === false,
    "messenger-dark": state.isDark === true,
  });

  const classChatTitle = classNames("chat-title", {
    "chat-title-light": state.isDark === false,
    "chat-title-dark": state.isDark === true,
  });

  const classEmptyList = classNames("empty-list", {
    "empty-list-light": state.isDark === false,
    "empty-list-dark": state.isDark === true,
  });

  const classMessageForm = classNames("message-form", {
    "message-form-light": state.isDark === false,
    "message-form-dark": state.isDark === true,
  });

  const classFooter = classNames("footer", {
    "footer-light": state.isDark === false,
    "footer-dark": state.isDark === true,
  });

  return (
    <>
      <div className="switch-theme">
        <FormControlLabel
          control={
            <Switch
              checked={state.isDark}
              onChange={handleChange}
              name="isDark"
              color="primary"
            />
          }
          label={<Brightness4Icon fontSize="large" />}
        />
      </div>
      <div>
        <Header class={classHeader} />
      </div>
      <div className="container">
        <ChatsList chats={list} onAdd={addChat} />
        <div className={classMessenger}>
          <AppRoater
            classform={classMessageForm}
            classlist={classEmptyList}
            classmessenger={classMessenger}
            classhomepage={classHomePage}
            classchattitle={classChatTitle}
            chats={list}
          />
        </div>
      </div>
      <div className={classFooter}>
        <Footer />
      </div>
    </>
  );
};
