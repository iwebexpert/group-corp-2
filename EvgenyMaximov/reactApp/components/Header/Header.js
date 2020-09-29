import { Divider } from "@material-ui/core";
import React from "react";
import "./Header.scss";
import EcoIcon from "@material-ui/icons/Eco";

export const Header = (props) => {
  return (
    <div className="header">
      <h1>
        Telegraf
        <EcoIcon fontSize="large" />
      </h1>
    </div>
  );
};
