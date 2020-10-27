import { ROBOT_LOAD } from "../actions/robot";
import { robot } from "../helpers/robotData";
const initialState = {
  entries: {},
  loading: false,
};

export const robotReducer = (state = initialState, action) => {
  switch (action.type) {
    case ROBOT_LOAD:
      return {
        ...state,
        entries: robot,
        loading: true,
      };

    default:
      return state;
  }
};
