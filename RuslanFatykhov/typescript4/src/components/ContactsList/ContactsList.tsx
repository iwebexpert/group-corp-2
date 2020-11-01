import React from "react";
import { Contact } from "../Contact";

type ContactsListType = {
  items: ContactType[];
};

export const ContactsList: React.FC<ContactsListType> = ({ items }) => {
  return (
    <div>
      {items.map((item) => (
        <Contact {...item} key={item.id} />
      ))}
    </div>
  );
};
