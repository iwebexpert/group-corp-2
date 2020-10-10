import {MessengerContainer} from './containers/MessengerContainer';
import {Error} from 'pages/Error';
import {Profile} from './components/Profile';
import {ProfileContainer} from './containers/ProfileContainer';

export const routes = [
    {
        path: ["/", "/chats/:id([0-9]+)"],
        exact: true,
        component: MessengerContainer,
    },
    {
        path: "/profile",
        exact: false,
        component: ProfileContainer
    },
    {
        path: "*",
        exact: false,
        component: Error
    },
]; 