import { chats } from "./chats";
import { profile } from "./profile";
const { combineReducers } = require("redux");
export const rootReducer = combineReducers({
  chats,
  profile,
});
