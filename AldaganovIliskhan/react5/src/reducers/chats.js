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
    default:
      return state;
  }
};
