import {handleActions} from "redux-actions";
import {
    openConversationManager,
    openCreateConversation,
    setAboutPageOpen, setCommonViewImages, setContactsLoading, setError, setForwardMessage, setLoading,
} from "../actions";

const initialState = {
    forwardMessage: null,
    loading: false,
    error: null,
    contactsLoading: false,
    commonViewImages: null,
    aboutPageOpen: false,
    createConversationOpen: false,
    conversationManagerOpen: false
};
export const SystemReducer = handleActions({
    [setForwardMessage]: (state, action) => ({...state, forwardMessage: action.payload}),
    [setLoading]: (state, action) => ({...state, loading: action.payload}),
    [setError]: (state, action) => ({...state, error: action.payload}),
    [setContactsLoading]: (state, action) => ({...state, contactsLoading: action.payload}),
    [setCommonViewImages]: (state, action) => ({...state, commonViewImages: action.payload}),
    [setAboutPageOpen]: (state, action) => ({...state, aboutPageOpen: action.payload}),
    [openCreateConversation]: (state, action) => ({...state, createConversationOpen: action.payload}),
    [openConversationManager]: (state, action) => ({...state, conversationManagerOpen: action.payload}),
}, initialState);

