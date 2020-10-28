import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import classNames from "classnames";

import "./Message.scss";

export type MessagePropsType = {
	text: string,
	author: string,
	time: string,
	id:string,
	chatId : number,
	key: string,
	onDelete: (id:string) => void,
}

export const Message:React.FC<MessagePropsType> = ({text, author, time, onDelete, id}) => {
  const classes:string = classNames("message", {
    "message-user": author !== "Бот",
    "message-bot": author === "Бот",
  });

  const deleteMessage = ():void => {
	 onDelete(id);
  };

  return (
    <div className={classes}>
      {author !== "Бот" ? (
        <div className="delete-icon" key={id} onClick={deleteMessage}>
          <CloseIcon fontSize="small" />
        </div>
      ) : null}
      {text} - <b className="message-author">{author}</b> <br />
      <b className="message-author">{time}</b>
    </div>
  );
};
