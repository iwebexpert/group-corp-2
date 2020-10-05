import { Wrap } from 'components/Layout';
import { Profile } from 'components/ProfileTemplate';

export const routes = [
  {
    path: '/',
    exact: true,
    component: Wrap
  },
  {
    path: '/chats/:id([0-9]+)',
    exact: true,
    component: Wrap
  },
  {
    path: '/profile',
    exact: true,
    component: Profile
  }
];