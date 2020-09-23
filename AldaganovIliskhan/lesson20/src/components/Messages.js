import React from "react";

export const Messages = ({ messages }) => {
  return (
    <div>
      {messages.map((item, i) => (
        <p key={i}>{item.message}</p>
      ))}
    </div>
  );
};
