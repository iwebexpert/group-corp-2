import React from "react";

export const Message = (props) => {
  return (
    <div>
      {props.text} - <b>{props.author}</b>
    </div>
  );
};
