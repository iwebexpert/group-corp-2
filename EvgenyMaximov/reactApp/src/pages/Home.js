import React from "react";

import "../App.scss";

export const Home = (props) => {
  return (
    <div className={props.class}>
      <h1>Welcome to Telegraf!</h1>
      <h3>Choose any chat</h3>
    </div>
  );
};
