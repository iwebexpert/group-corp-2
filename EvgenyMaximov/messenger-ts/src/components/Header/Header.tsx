import React from "react";
import { Link } from "react-router-dom";

import EcoIcon from "@material-ui/icons/Eco";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Button } from "@material-ui/core";

import "../../App.scss";

type HeaderType = {
	classheader: string,
	profile: ProfileType,
	isLoading: boolean,
	isError: boolean,
	reloadProfile: () => void,
};

export const Header:React.FC<HeaderType> = ({ classheader, profile, isLoading, isError, reloadProfile }) => {
  return (
    <div className="header-area">
      <Link to="/profile" className="profile-icon">
        {isLoading ? (
          <div className="lds-dual-ring-header"></div>
        ) : (
          <AccountCircleIcon fontSize="large" color="action" />
        )}
        {isError ? (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={reloadProfile}
          >
            Обновить профиль
          </Button>
        ) : null}
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
