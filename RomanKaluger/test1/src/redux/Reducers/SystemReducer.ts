import {handleActions} from "redux-actions";
import {
    openConversationManager,
    openCreateConversation,
    setAboutPageOpen, setCommonViewImages, setContactsLoading, setError, setForwardMessage, setLoading,
} from "../actions";
import {CommonAction} from '../reduxTypes/rdxActions';
import {ISystemState} from "../reduxTypes/rdx";
import {Reducer} from "redux";

const initialState: ISystemState = {
    forwardMessage: null,
    loading: false,
    error: null,
    contactsLoading: false,
    commonViewImages: null,
    aboutPageOpen: false,
    createConversationOpen: false,
    conversationManagerOpen: false
};
export const SystemReducer: Reducer<ISystemState, CommonAction> = handleActions<ISystemState, CommonAction>({
    [setForwardMessage.toString()]: (state: ISystemState, action: CommonAction): ISystemState => ({
        ...state,
        forwardMessage: action.payload
    }),
    [setLoading.toString()]: (state: ISystemState, action: CommonAction): ISystemState => ({
        ...state,
        loading: action.payload
    }),
    [setError.toString()]: (state: ISystemState, action: CommonAction): ISystemState => ({
        ...state,
        error: action.payload
    }),
    [setContactsLoading.toString()]: (state: ISystemState, action: CommonAction): ISystemState => ({
        ...state,
        contactsLoading: action.payload
    }),
    [setCommonViewImages.toString()]: (state: ISystemState, action: CommonAction): ISystemState => ({
        ...state,
        commonViewImages: action.payload
    }),
    [setAboutPageOpen.toString()]: (state: ISystemState, action: CommonAction): ISystemState => ({
        ...state,
        aboutPageOpen: action.payload
    }),
    [openCreateConversation.toString()]: (state: ISystemState, action: CommonAction): ISystemState => ({
        ...state,
        createConversationOpen: action.payload
    }),
    [openConversationManager.toString()]: (state: ISystemState, action: CommonAction): ISystemState => ({
        ...state,
        conversationManagerOpen: action.payload
    }),
}, initialState);

