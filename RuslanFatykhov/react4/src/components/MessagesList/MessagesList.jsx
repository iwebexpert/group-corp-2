import React from "react";

import { Message } from "../Message";

export const MessagesList = ({ items }) => {
  return items.map((item) => <Message {...item} key={item.id} />);
};
