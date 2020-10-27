import React from "react";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Error } from "../../pages/Error";

import "./Header.css";

export const Header = ({ infoProfile, loadStatus }) => {
  switch (loadStatus) {
    case "loaded":
      return (
        <div className="header">
          <Link
            button="true"
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
              <Avatar
                src={
                  infoProfile.avatar
                    ? infoProfile.avatar
                    : "http://placehold.it/106&text=1"
                }
              />
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
