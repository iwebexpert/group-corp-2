import React from "react";
import classNames from "classnames";
import { Grid } from "@material-ui/core";
import "./Message.scss";

export type MesageType = {
  text: string;
  author: string;
};

export const Message: React.FC<MesageType> = ({ text, author }) => {
  const classes = classNames("message", {
    "message-sender": author !== "Робот",
    "message-bot": author === "Робот",
  });

  return (
    <Grid className={classes}>
      <div className="box">
        <b className="message-author">{author}</b>: {text}
      </div>
    </Grid>
  );
};
