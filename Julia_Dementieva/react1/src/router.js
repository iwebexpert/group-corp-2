import {Home} from 'pages/Home';
import {About} from 'pages/About';
import {Error} from 'pages/Error';
import {Messenger} from 'components/Messenger';

export const routes = [
    {
        path: '/',
        exact: true,
        component: Messenger
    },
    {
        path: '/about',
        exact: true,
        component: About
    },
    {
        path: '/chats/:id([0-9]+)',
        exact: true,
        component: Messenger
    },
    {
        path: '*',
        exact: false,
        component: Error
    },
];