import update from "react-addons-update";
import { chats } from "../helpers/chatsData";
import { nanoid } from "nanoid";

import {
  CHATS_LOAD_REQUEST,
  CHATS_LOAD_SUCCESS,
  CHATS_LOAD_FAILURE,
  CHATS_ADD_SUCCESS,
  CHATS_ADD_REQUEST,
  CHATS_ADD_FAILURE,
  MESSAGES_SEND_SUCCESS,
  MESSAGES_SEND_FAILURE,
  FIRE_CHAT_SUCCESS,
  UNFIRE_CHAT_SUCCESS,
} from "../actions/chats";

const initialState = {
  entries: {},
  loading: false,
  error: false,
};

export const chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    //CHATS_LOAD
    case CHATS_LOAD_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case CHATS_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        entries: action.payload,
      };

    case CHATS_LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };

    //CHATS_ADD

    case CHATS_ADD_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case CHATS_ADD_SUCCESS:
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

    case CHATS_ADD_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };

    //MESSAGES

    case MESSAGES_SEND_SUCCESS:
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

    case MESSAGES_SEND_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };

    //FIRE

    case FIRE_CHAT_SUCCESS:
      return update(state, {
        entries: {
          [action.payload.chatId]: {
            fire: { $set: true },
          },
        },
      });
    case UNFIRE_CHAT_SUCCESS:
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
