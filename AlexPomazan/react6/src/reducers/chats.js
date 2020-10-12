import update from "react-addons-update";
import botImg from "../img/bot.png";
import manImg from "../img/man.png";

import {
  CHATS_LOAD,
  CHATS_MESSAGE_SEND,
  ADD_CHAT,
  CHAT_FIRE,
  CHAT_UNFIRE,
} from "../actions/chats";

import { chats } from "../helpers/chatsData";

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
                  author: action.payload.author,
                  img:
                    action.payload.author === "Bot Bob"
                      ? (action.payload.img = botImg)
                      : manImg,
                  text: action.payload.text,
                },
              ],
            },
          },
        },
      });
    case ADD_CHAT:
      return update(state, {
        entries: {
          $push: [
            {
              id: state.entries.length,
              title: action.payload.chat.title,
              messages: [
                {
                  id: 0,
                  author: "Bot Bob",
                  img: botImg,
                  text: "Приветствую в новом чате!",
                },
              ],
            },
          ],
        },
      });
    case CHAT_FIRE:
      return update(state, {
        entries: {
          [action.payload]: {
            fire: {
              $set: true,
            },
          },
        },
      });
    case CHAT_UNFIRE:
      return update(state, {
        entries: {
          [action.payload]: {
            fire: {
              $set: false,
            },
          },
        },
      });
    default:
      return state;
  }
};
