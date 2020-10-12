import types from "../actionTypes";

const initialState={
    forwardMessage: null,
    loading: false,
    commonViewImages: null
};
export const SystemReducer = (state = initialState, action)=>{
    switch (action.type) {
        case types.SET_FORWARD_MESSAGE: return {...state, forwardMessage: action.payload};
        case types.LOADING: return {...state, loading: action.payload};
        case types.SET_COMMON_VIEW_IMAGES: return {...state, commonViewImages: action.payload};
        default: return state;
    }
};
