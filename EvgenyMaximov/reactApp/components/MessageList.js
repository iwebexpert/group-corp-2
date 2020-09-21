import React, { useState } from "react";
import { Message } from "./Message";

export const MessagesList = (props) => {
  const [list, updateList] = useState(props.items);

  const addMessage = () => {
    updateList([...list, props.text]);
  };

  return (
    <>
      {list.map((item, index) => (
        <Message text={item} author="WebDev" key={index} />
      ))}
      <button onClick={addMessage}>Написать "Нормально"</button>
    </>
  );
};
