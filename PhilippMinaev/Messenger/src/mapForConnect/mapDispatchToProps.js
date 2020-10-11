import { profileLoadAction } from "../actions/profile";
import {
  chatsLoadAction,
  chatsListSendAction,
  chatsMessageSendAction,
  messageUnfireAction,
} from "../actions/chats";
import { robotLoadAction } from "../actions/robot";
import { push } from "connected-react-router";

export const mapDispatchToProps = (component) => {
  switch (component) {
    case "HeaderContainer": {
      return function (dispatch) {
        return {
          profileLoadAction: () => dispatch(profileLoadAction()),
          push: (url) => dispatch(push(url)),
        };
      };
    }
    case "ProfileContainer": {
      return function (dispatch) {
        return {
          profileLoadAction: () => dispatch(profileLoadAction()),
        };
      };
    }

    case "ChatsListContainer": {
      return function (dispatch) {
        return {
          chatsLoadAction: () => dispatch(chatsLoadAction()),
          chatsListSendAction: (chat) => dispatch(chatsListSendAction(chat)),
          messageUnfireAction: (chatid) =>
            dispatch(messageUnfireAction(chatid)),
          redirect: (chatId) => dispatch(push(`/chats/${chatId}`)),
        };
      };
    }

    case "MessengerContainer": {
      return function (dispatch) {
        return {
          chatsLoadAction: () => dispatch(chatsLoadAction()),
          profileLoadAction: () => dispatch(profileLoadAction()),
          robotLoadAction: () => dispatch(robotLoadAction()),
          chatsMessageSendAction: (message) =>
            dispatch(chatsMessageSendAction(message)),
        };
      };
    }

    default:
      return null;
  }
};
