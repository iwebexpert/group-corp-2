import React from "react";
import { Link } from "react-router-dom";

import EcoIcon from "@material-ui/icons/Eco";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import "../../src/App.scss";

export const Header = (props) => {
  return (
    <div className="header-area">
      <Link to="/profile" className="profile-icon">
        <AccountCircleIcon fontSize="large" color="action" />
      </Link>
      <Link to="/" className={props.class}>
        <h1>
          Telegraf
          <EcoIcon fontSize="large" />
        </h1>
      </Link>
    </div>
  );
};
