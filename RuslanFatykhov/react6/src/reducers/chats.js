import update from "react-addons-update";
import { chats } from "../helpers/chatsData";

import {
  CHATS_LOAD,
  CHATS_MESSAGE_SEND,
  CHATS_ADD,
  FIRE_CHAT,
  UNFIRE_CHAT,
  DELETE_CHAT,
} from "../actions/chats";

const initialState = {
  entries: {},
  loading: false,
};

export const chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHATS_LOAD:
      return {
        ...state,
        entries: chats,
      };
    case CHATS_MESSAGE_SEND:
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
    case CHATS_ADD:
      const { chatId, title } = action.payload;
      return update(state, {
        entries: {
          $merge: {
            [chatId]: {
              id: chatId,
              title,
              fire: false,
              messages: [
                {
                  id: 0,
                  author: "Неизвестный",
                  text: "А ты еще кто?",
                },
              ],
              contacts: [
                {
                  id: 0,
                  name: "Неизвестный человек",
                  online: "был онлайн сегодня 01:45",
                },
                {
                  id: 1,
                  name: "Какой-то тип",
                  online: "был онлайн сегодня 16:14",
                },
                {
                  id: 2,
                  name: "Случайный собеседник",
                  online: "был онлайн вчера 09:38",
                },
              ],
            },
          },
        },
      });
    case FIRE_CHAT:
      return update(state, {
        entries: {
          [action.payload.chatId]: {
            fire: { $set: true },
          },
        },
      });
    case UNFIRE_CHAT:
      return update(state, {
        entries: {
          [action.payload.chatId]: {
            fire: { $set: false },
          },
        },
      });

    case DELETE_CHAT:
      return {
                ...state,
                entries: state.entries.filter((el) => el.id != action.payload.chatId)
            };

    default:
      return state;
  };
};
