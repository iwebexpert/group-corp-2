import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./Message.css";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";

export const messageType = {
    text: PropTypes.string.isRequired,
};

export class Message extends React.Component {
    static propTypes = messageType;
    render() {
        const { text, author, handleDeleteMessage } = this.props;
        const classes = classNames("message", {
            "message-sender": author !== "Bot",
            "message-bot": author === "Bot",
        });

        return <div className={classes}>
            {text} - <b className="message-author">{author}</b>
            <DeleteForeverOutlinedIcon onClick={handleDeleteMessage} className="delete-message" />
        </div>;
    }
}