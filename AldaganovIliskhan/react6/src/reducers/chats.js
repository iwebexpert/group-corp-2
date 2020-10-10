const initialState = {
  items: null,
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
    case "REMOVE_CHAT":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};
