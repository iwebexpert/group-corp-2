import React from "react";
import PropTypes from "prop-types";
import botImg from "./../img/bot.png";
import manImg from "./../img/man.png";

export const messageType = {
  text: PropTypes.string.isRequired,
};

export const Message = ({ text, author }) => {
  let img;
  if (author === "Bot Bob") {
    img = botImg;
  } else {
    img = manImg;
  }
  return (
    <div className="message-content">
      <div className="message__img">
        <img className="img-author" src={img} alt="" />
      </div>
      <div className="message">
        <b className="message__author">{author}</b>
        <p className="message__text">{text}</p>
      </div>
    </div>
  );
};

Message.propTypes = messageType;
