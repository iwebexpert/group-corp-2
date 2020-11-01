import { Reducer } from "redux";
import update from "react-addons-update";
import { nanoid } from "nanoid";

import { ChatsActions, ChatsActionTypes } from "../actions/chats";

export type ChatsReducerState = {
  entries: any;
  loading: boolean;
  error: boolean;
};

const initialState: ChatsReducerState = {
  entries: {},
  loading: false,
  error: false,
};

export const chatsReducer: Reducer<ChatsReducerState, ChatsActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ChatsActionTypes.CHATS_LOAD_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case ChatsActionTypes.CHATS_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        entries: action.payload,
      };

    case ChatsActionTypes.CHATS_LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case ChatsActionTypes.MESSAGES_SEND_SUCCESS:
      return update(state, {
        entries: {
          [action.payload.chatId]: {
            messages: {
              $push: [
                {
                  id: action.payload.id,
                  text: action.payload.text,
                  author: action.payload.author,
                },
              ],
            },
          },
        },
      });

    case ChatsActionTypes.MESSAGES_SEND_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case ChatsActionTypes.CHATS_ADD_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case ChatsActionTypes.CHATS_ADD_SUCCESS:
      //@ts-ignore
      return update(state, {
        entries: {
          $push: [
            {
              id: state.entries.length,
              title: action.payload.title,
              fire: false,
              messages: [
                {
                  author: "Незнакомец",
                  text: "Ты кто?",
                  id: nanoid(),
                },
              ],
              contacts: [
                {
                  id: 0,
                  name: "Подозрительная личность",
                  online: "был онлайн сегодня 22:23",
                },
                {
                  id: 1,
                  name: "Какой-то тип",
                  online: "был онлайн сегодня 07:02",
                },
                {
                  id: 2,
                  name: "Прохожий",
                  online: "был онлайн вчера 02:33",
                },
              ],
            },
          ],
        },
      });

    case ChatsActionTypes.CHATS_ADD_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case ChatsActionTypes.FIRE_CHAT_SUCCESS:
      return update(state, {
        entries: {
          [action.payload.chatId]: {
            fire: { $set: true },
          },
        },
      });
    case ChatsActionTypes.UNFIRE_CHAT_SUCCESS:
      return update(state, {
        entries: {
          [action.payload.chatId]: {
            fire: { $set: false },
          },
        },
      });

    default:
      return state;
  }
};
