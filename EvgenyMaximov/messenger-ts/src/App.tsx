import React, { useState } from "react";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import classNames from "classnames";

import { ChatsListContainer } from "./containers/ChatsListContainer";
import { Footer } from "./components/Footer";
import { HeaderContainer } from "./containers/HeaderContainer";
import { AppRouter } from "./components/AppRouter/AppRouter";

import "./App.scss";

type ThemeStateType = {
	isDark: boolean,
};

export const App:React.FC<{}> = () => {
  const [state, setState] = useState<ThemeStateType>({
    isDark: false,
  });

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>):void => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const classHeader:string = classNames("header", {
    "header-light": state.isDark === false,
    "header-dark": state.isDark === true,
  });

  const classHomePage:string = classNames("home-page", {
    "home-page-light": state.isDark === false,
    "home-page-dark": state.isDark === true,
  });

  const classMessenger:string = classNames("messenger", {
    "messenger-light": state.isDark === false,
    "messenger-dark": state.isDark === true,
  });

  const classChatTitle:string = classNames("chat-title", {
    "chat-title-light": state.isDark === false,
    "chat-title-dark": state.isDark === true,
  });

  const classEmptyList:string = classNames("empty-list", {
    "empty-list-light": state.isDark === false,
    "empty-list-dark": state.isDark === true,
  });

  const classMessageForm:string = classNames("message-form", {
    "message-form-light": state.isDark === false,
    "message-form-dark": state.isDark === true,
  });
  
  const classFooter:string = classNames("footer", {
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
        <HeaderContainer classheader={classHeader} />
      </div>
      <div className="container">
        <ChatsListContainer />
        <div className={classMessenger}>
          <AppRouter
            classform={classMessageForm}
            classlist={classEmptyList}
            classhomepage={classHomePage}
            classchattitle={classChatTitle}
          />
        </div>
      </div>
      <div className={classFooter}>
        <Footer />
      </div>
    </>
  );
};
