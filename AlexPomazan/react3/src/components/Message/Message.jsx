import React, { Component } from "react";
import PropTypes from "prop-types";
import botImg from "./../../img/bot.png";
import manImg from "./../../img/man.png";
import classNames from "classnames";
import "./Message.css";

export const messageType = {
  text: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export class Message extends Component {
  getImg() {
    const { author } = this.props;
    let img;
    if (author === "Bot Bob") {
      return (img = botImg);
    } else {
      return (img = manImg);
    }
  }

  render() {
    const { text, author } = this.props;
    const classes = classNames("text", {
      "message-sender": author !== "Bot Bob",
      "message-bot": author === "Bot Bob",
    });

    return (
      <div className={classes}>
        <div className="message__img">
          <img className="img-author" src={this.getImg()} alt="" />
        </div>
        <div className="message">
          <b className="message__author">{author}</b>
          <p className="message__text">{text}</p>
        </div>
      </div>
    );
  }
}
Message.propTypes = messageType;
