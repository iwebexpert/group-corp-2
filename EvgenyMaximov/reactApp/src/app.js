import React from "react";
import ReactDom from "react-dom";
import { MessagesList } from "../components/MessageList";
import messageData from "../state/messageData";

ReactDom.render(
  <MessagesList items={messageData} text={"Нормально"} />,
  document.getElementById("root")
);
