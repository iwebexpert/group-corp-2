import {Messenger} from './components/Messenger'
import {Error} from 'pages/Error';
import {Profile} from './components/Profile';

export const routes = [
    {
        path: "/",
        exact: true,
        component: Messenger
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