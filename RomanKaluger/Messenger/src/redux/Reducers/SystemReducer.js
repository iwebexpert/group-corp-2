import types from "../actionTypes";

const initialState={
    forwardMessage: null,
    loading: false,
    error: null,
    contactsLoading: false,
    commonViewImages: null,
    aboutPageOpen: false,
};
export const SystemReducer = (state = initialState, action)=>{
    switch (action.type) {
        case types.SET_FORWARD_MESSAGE: return {...state, forwardMessage: action.payload};
        case types.LOADING: return {...state, loading: action.payload};
        case types.ERROR: return {...state, error: action.payload};
        case types.CONTACTS_LOADING: return {...state, contactsLoading: action.payload};
        case types.SET_COMMON_VIEW_IMAGES: return {...state, commonViewImages: action.payload};
        case types.SET_ABOUT_PAGE_OPEN: return {...state, aboutPageOpen: action.payload};
        default: return state;
    }
};
