import React from "react";
import classNames from "classnames";
import "./Message.css";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import { MessageType } from "../../types";

export const Message: React.FC<MessageType> = (props) => {
    const { text, author, handleDeleteMessage, message } = props;
    const classes: string = classNames("message", {
        "message-sender": author !== "Bot",
        "message-bot": author === "Bot",
    });

    return <div className={classes}>
        {text} - <b className="message-author">{author}</b>
        <DeleteForeverOutlinedIcon onClick={() => handleDeleteMessage(message.id!)} className="delete-message" />
    </div>
};