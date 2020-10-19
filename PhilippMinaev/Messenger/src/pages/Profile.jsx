import React from "react";
import { Error } from "./Error";
import "./Profile.css";

export const Profile = ({ loadStatus, infoProfile }) => {
  switch (loadStatus) {
    case "loaded":
      return (
        <div className="info">
          <div className="picContainer">
            <img className="pic" src={infoProfile.avatar} />
          </div>
          <div className="infoUser">
            <h1>Login: {infoProfile.name}</h1>
            <h1>Age: {infoProfile.age}</h1>
            <h1>City: {infoProfile.city}</h1>
            <h1>Main chat: {infoProfile.mainChat}</h1>
          </div>
        </div>
      );
    case "loading":
      return <div className="loading">Loading...</div>;

    default:
      return <Error />;
  }
};
