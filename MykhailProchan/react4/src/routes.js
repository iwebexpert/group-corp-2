import { Wrap } from 'components/Layout';
import { Messenger } from 'components/Messenger';

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
  }
];