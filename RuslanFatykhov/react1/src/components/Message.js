import React from "react";
import "./css/Message.css";

const Message = ({ message }) => {
  return <p className="message">{message}</p>;
};

export default Message;
