import types from "../actionTypes";

const initialState={
    forwardMessage: null,
};

export const SystemReducer = (state = initialState, action)=>{
    switch (action.type) {
        case types.SET_FORWARD_MESSAGE: return {...state, forwardMessage: action.payload};
        default: return state;
    }
};
