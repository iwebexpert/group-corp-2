import React from "react";
import { Link } from "react-router-dom";

import EcoIcon from "@material-ui/icons/Eco";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import "../../App.scss";

export const Header = (props) => {
  const { classheader, profile } = props;
  return (
    <div className="header-area">
      <Link to="/profile" className="profile-icon">
        <AccountCircleIcon fontSize="large" color="action" />
        <p>
          {profile.firstName} {profile.secondName}
        </p>
      </Link>
      <Link to="/" className={classheader}>
        <h1>
          Telegraf
          <EcoIcon fontSize="large" />
        </h1>
      </Link>
    </div>
  );
};
