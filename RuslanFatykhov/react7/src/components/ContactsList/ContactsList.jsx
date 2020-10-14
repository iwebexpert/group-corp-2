import React from "react";
import { Contact } from "../Contact";

export const ContactsList = (props) => {
  return props.items.map((item) => <Contact {...item} key={item.id} />);
};
