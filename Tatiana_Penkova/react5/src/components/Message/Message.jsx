import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./Message.css";

export const messageType = {
    text: PropTypes.string.isRequired,
};

export class Message extends React.Component {
    static propTypes = messageType;

    render() {
        const { text, author } = this.props;

        const classes = classNames("message", {
            "message-sender": author !== "Bot",
            "message-bot": author === "Bot",
        });

        return <div className={classes}>
            {text} - <b className="message-author">{author}</b>
        </div>;
    }
}