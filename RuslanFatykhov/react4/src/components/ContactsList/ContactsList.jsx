import React from "react";
import { Grid, List, withStyles } from "@material-ui/core";
import { Contact } from "../Contact";

export const ContactsList = (props) => {
  return props.items.map((item) => (
    <Contact name={item.name} online={item.online} key={item.id} />
  ));
};
