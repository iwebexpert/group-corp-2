import { MessengerContainer } from "./containers/MessengerContainer";
import { Error } from "./pages/Error/Error";
import { ProfileContainer } from "./containers/ProfileContainer";
import { FC } from "react";

type RoutesFuncType = {
  path: string | string[];
  exact: boolean;
  component: FC<{}>;
};

export const routes: RoutesFuncType[] = [
  {
    path: ["/", "/chats/:id([0-9]+)"],
    exact: true,
    component: MessengerContainer,
  },
  {
    path: "/profile",
    exact: false,
    component: ProfileContainer,
  },
  {
    path: "*",
    exact: false,
    component: Error,
  },
];
