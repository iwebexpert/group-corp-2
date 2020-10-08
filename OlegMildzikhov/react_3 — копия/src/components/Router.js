import React from 'react';
import { Switch, Route } from 'react-router-dom'
import {Layouts} from './Layout';
import {ChatList} from "./Chat-list";
import {Messenger} from "./Messenger"
import {chats} from './Chats-data/ChatData';
// import {Messenger} from "components/Messenger";

export const routes = [
    {
        path: '/',
        exact: true,
        component: Messenger
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
