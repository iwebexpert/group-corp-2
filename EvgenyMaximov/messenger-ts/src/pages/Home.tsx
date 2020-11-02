import React from "react";

import "../App.scss";

export type PageType = {
	classhomepage: string,
};

export const Home: React.FC<PageType> = ({ classhomepage }) => {
  return (
    <div className={classhomepage}>
      <h1>Welcome to Telegraf!</h1>
      <h3>Choose any chat</h3>
    </div>
  );
};
