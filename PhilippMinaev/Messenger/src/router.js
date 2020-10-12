import { Home } from "pages/Home";
import { Profile } from "pages/Profile";
import { Error } from "pages/Error";
import { Messenger } from "components/Messenger";

export const routes = [
  {
    path: "/",
    exact: true,
    component: Messenger,
  },
  {
    path: "/profile",
    exact: true,
    component: Profile,
  },
  {
    path: "/chats/:id([0-9]+)",
    exact: true,
    component: Messenger,
  },
  {
    path: "*",
    exact: false,
    component: Error,
  },
];
