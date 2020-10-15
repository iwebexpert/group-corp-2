import { RSAA, getJSON } from 'redux-api-middleware';
import { normalize } from 'normalizr';
import { chats } from '../utils/schemas';

export const ADD_CHAT = '@@chat/ADD_CHAT';

export const addChat = (title) => ({
   type: ADD_CHAT,
   title,
});

export const HIGHLIGHT_CHAT = '@@chat/HIGHLIGHT_CHAT';

export const highlightChat = (chatId) => ({
   type: HIGHLIGHT_CHAT,
   chatId,
});

export const UNHIGHLIGHT_CHAT = '@@chat/UNHIGHLIGHT_CHAT';

export const unhighlightChat = (chatId) => ({
   type: UNHIGHLIGHT_CHAT,
   chatId,
});


export const START_CHATS_LOADING = '@@message/START_CHATS_LOADING';
export const SUCCESS_CHATS_LOADING = '@@message/SUCCESS_CHATS_LOADING';
export const ERROR_CHATS_LOADING = '@@message/ERROR_CHATS_LOADING';

export const loadChats = () => ({
   [RSAA]: {
       endpoint: '/api/chats.json',
       method: 'GET',
       types: [
           START_CHATS_LOADING,
           {
               type: SUCCESS_CHATS_LOADING,
               payload: (action, state, res) => getJSON(res).then(
                   json => normalize(json, [chats]),
               ),
           },
           ERROR_CHATS_LOADING,
       ],
   },
});