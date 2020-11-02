import React from "react";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Error } from "../../pages/Error";

import "./Header.css";

export type InfoProfile = {
  name: string;
  age: number;
  city: string;
  mainChat: string;
  avatar: string;
};

type HeaderType = {
  infoProfile: InfoProfile;
  loadStatus: string | null;
};

export const Header: React.FC<HeaderType> = ({ infoProfile, loadStatus }) => {
  switch (loadStatus) {
    case "loaded":
      return (
        <div className="header">
          <Link
            style={{
              textDecoration: "none",
              cursor: "pointer",
              fontFamily: "Courier Prime",
            }}
            className="header-logo"
            to={"/"}
          >
            Messenger App
          </Link>
          <Link
            to="/profile"
            style={{ color: "#bc1d1d", textDecoration: "none" }}
          >
            <div className="header-avatar">
              <Avatar src={infoProfile.avatar} />
              {infoProfile.name ? infoProfile.name : "loading"}
            </div>
          </Link>
        </div>
      );
    case "loading":
      return <div>Loading</div>;

    default:
      return <Error />;
  }
};
