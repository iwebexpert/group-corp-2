import { MessengerContainer } from "containers/MessengerContainer";
import { Error } from "pages/Error/Error";
import { ProfileContainer } from "containers/ProfileContainer";

export const routes = [
  {
    path: ["/", "/chats/:id([0-9]+)"],
    exact: true,
    component: MessengerContainer,
  },
  {
    path: "/profile",
    exact: true,
    component: ProfileContainer,
  },
  {
    path: "*",
    exact: false,
    component: Error,
  },
];
