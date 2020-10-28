import { Home } from "../pages/Home";
import { About } from "../pages/About";
import { Error } from "../pages/Error";
import { MessengerContainer } from "../containers/MessengerContainer";
import { Profile } from "../pages/Profile";
import { RoutesFuncType } from "../types";

export const routes: RoutesFuncType[] = [
    {
        path: "/",
        exact: true,
        component: Home
    },
    {
        path: "/home",
        exact: true,
        component: Home
    },
    {
        path: "/about",
        exact: true,
        component: About
    },
    {
        path: "/chats/:id([0-9]+)",
        exact: true,
        component: MessengerContainer
    },
    {
        path: "/profile",
        exact: false,
        component: Profile
    },
    {
        path: "*",
        exact: false,
        component: Error
    },
];