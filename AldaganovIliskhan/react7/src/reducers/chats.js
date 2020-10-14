const initialState = {
  items: null,
  isLoading: false,
  isError: false,
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
    case "SET_LOADING":
      return {
        ...state,
        isLoaded: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        isError: action.payload,
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
