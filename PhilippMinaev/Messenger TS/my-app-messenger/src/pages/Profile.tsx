import React from "react";
import { InfoProfile } from "../components/Header/Header";
import { Error } from "./Error";
import "./Profile.css";

type ProfileType = {
  loadStatus: string | null;
  infoProfile: InfoProfile;
};

export const Profile: React.FC<ProfileType> = ({ loadStatus, infoProfile }) => {
  switch (loadStatus) {
    case "loaded":
      return (
        <div className="info">
          <div className="picContainer">
            <img
              className="pic"
              src={
                infoProfile.avatar
                  ? infoProfile.avatar
                  : "http://placehold.it/106&text=1"
              }
            />
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
