import { apiMiddleware } from 'redux-api-middleware';
import messageMiddleware from './messageMiddleware';
import chatMiddleware from './chatMiddleware';

export default [
    apiMiddleware,
    messageMiddleware,
    chatMiddleware,
];