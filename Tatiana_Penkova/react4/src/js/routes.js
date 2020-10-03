import { Home } from "../pages/Home";
import { About } from "../pages/About";
import { Error } from "../pages/Error";
import { Messenger } from "../components/Messenger";


import { Profile } from "../pages/Profile";

export const routes = [
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
        component: Messenger
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