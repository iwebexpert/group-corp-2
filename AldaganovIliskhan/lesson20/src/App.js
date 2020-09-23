import React, { useState } from "react";
import { Messages } from "./components/Messages";
export const App = () => {
  const [messages, setMessages] = useState([]);
  const onAddMessage = (obj) => {
    const newMessage = [...messages, obj];
    setMessages(newMessage);
  };
  return (
    <div className="app">
      <Messages messages={messages} />
      <button onClick={() => onAddMessage({ message: "Нормально" })}>
        Добавить
      </button>
    </div>
  );
};
