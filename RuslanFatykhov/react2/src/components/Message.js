import React from "react";
import "./css/Message.css";


const Message = ({ message, author }) => {
  return (
    <p className="message">
      {author}: {message}
    </p>
  );
};


export default Message;
