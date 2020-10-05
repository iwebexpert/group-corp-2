import { Messenger } from "components/Messenger";
import { Error } from "pages/Error/Error";
import { Profile } from "pages/Profile/Profile";

export const routes = [
  {
    path: "/",
    exact: true,
    component: Messenger,
  },
  {
    path: "/chats/:id([0-9]+)",
    exact: true,
    component: Messenger,
  },
  {
    path: "/profile",
    exact: true,
    component: Profile,
  },
  {
    path: "*",
    exact: false,
    component: Error,
  },
];
