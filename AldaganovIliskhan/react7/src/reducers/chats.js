const initialState = {
  items: null,
  isChatsLoading: false,
  isChatsError: false,
  isMessagesError: false,
  isMessagesLoading: false,
};
export const chats = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CHATS":
      return {
        ...state,
        items: action.payload,
      };
    case "ADD_CHAT":
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case "SET_CHATS_LOADING":
      return {
        ...state,
        isChatsLoading: action.payload,
      };
    case "SET_CHATS_ERROR":
      return {
        ...state,
        isChatsError: action.payload,
      };
    case "SET_MESSAGES_ERROR":
      return {
        ...state,
        isMessagesError: action.payload,
      };
    case "SET_MESSAGES_LOADING":
      return {
        ...state,
        isMessagesLoading: action.payload,
      };

    case "FIRE_CHAT":
      return {
        ...state,
        items: state.items.map((chat) => {
          if (chat.id === action.chatId) {
            chat.fire = true;
          }
          return chat;
        }),
      };
    case "UNFIRE_CHAT":
      return {
        ...state,
        items: state.items.map((chat) => {
          chat.fire = false;
          return chat;
        }),
      };
    case "REMOVE_CHAT":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "SEND_MESSAGE":
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload.chatId) {
            item.messages = [...item.messages, action.payload.obj];
          }
          return item;
        }),
      };
    case "EDIT_CHAT":
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload.chatId) {
            item.title = action.payload.newTitle;
          }
          return item;
        }),
      };
    default:
      return state;
  }
};
