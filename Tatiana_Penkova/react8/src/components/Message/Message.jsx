import React from "react";
import classNames from "classnames";
import { PropTypes } from "prop-types"
import "./Message.css";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";

export const Message = (props) => {

    const { text, author, handleDeleteMessage, message } = props;
    console.log("!!!!!!!!!!", message)
    const classes = classNames("message", {
        "message-sender": author !== "Bot",
        "message-bot": author === "Bot",
    });

    return <div className={classes}>
        {text} - <b className="message-author">{author}</b>
        <DeleteForeverOutlinedIcon onClick={() => handleDeleteMessage(message.id)} className="delete-message" />
    </div>;
};

Message.propTypes = {
    text: PropTypes.string.isRequired,
};