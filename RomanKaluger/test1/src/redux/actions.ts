import {ActionFunction1, ActionFunctionAny, createAction} from "redux-actions";
import {
    CommonAction, CommonSignalAction, IAuth,
    IChangeChatData,
    IChangeChatDataPayload,
    IChangeWsStatus,
    ICreateChat, IDeleteChat,
    ILoadChatMessages, ILoadContacts, IOpenConversationManager, IOpenCreateConversation,
    IOpenUserProfile, IRegister,
    ISendMessage, ISetAboutPageOpen,
    ISetChats, ISetCommonViewImages, ISetContacts,
    ISetCurrentUser,
    ISetError, ISetForwardMessage,
    ISetFrowardMessagePayload,
    ISetLoading,
    ISetSelectedChat, IUpdateUser, IUpdateUserPayload
} from './reduxTypes/rdxActions';
import {IAuthData, IChat, IContacts, IMessage, IRegisterData, IUser} from "../types/globalTypes";
import {wsStatus} from "../configs/statuses";
import {IInputAuth, IInputReg, IInputUpdate} from "../utils/DbWorker";

export const changeWsStatus: ActionFunction1<wsStatus, IChangeWsStatus> = createAction('UPDATE_WS_CONNECTION_STATUS');
export const setCurrentUser: ActionFunction1<IUser | null, ISetCurrentUser> = createAction('SET_CURRENT_USER');
export const openUserProfile: ActionFunction1<IUser | null, IOpenUserProfile> = createAction('OPENED_USER_PROFILE');
export const setSelectedChat: ActionFunction1<string, ISetSelectedChat> = createAction('SET_SELECTED_CHAT');
export const setChats: ActionFunction1<IChat[], ISetChats> = createAction('SET_CHATS');
export const setForwardMessage: ActionFunction1<ISetFrowardMessagePayload | null, ISetForwardMessage> = createAction('SET_FORWARD_MESSAGE');
export const setContacts: ActionFunction1<IContacts, ISetContacts> = createAction('SET_CONTACTS');
export const setCommonViewImages: ActionFunction1<string[] | null, ISetCommonViewImages> = createAction('SET_COMMON_VIEW_IMAGES');
export const sendMessage: ActionFunction1<Partial<IMessage>, ISendMessage> = createAction('SEND_MESSAGE');
export const setLoading: ActionFunction1<boolean, ISetLoading> = createAction('LOADING');
export const setContactsLoading: ActionFunction1<boolean, CommonSignalAction> = createAction('CONTACTS_LOADING');
export const setError: ActionFunction1<Partial<Error> | null, ISetError> = createAction('ERROR');
export const loadChats: ActionFunctionAny<CommonSignalAction> = createAction('LOAD_CHATS');
export const loadChatMessages: ActionFunction1<string, ILoadChatMessages> = createAction('LOAD_CHAT_MESSAGES');
export const loadContacts: ActionFunction1<string, ILoadContacts> = createAction('LOAD_CONTACTS');
export const auth: ActionFunction1<IInputAuth, IAuth> = createAction('AUTH');
export const register: ActionFunction1<IInputReg, IRegister> = createAction('REGISTER');
export const updateUser: ActionFunction1<IInputUpdate, IUpdateUser> = createAction('UPDATE_USER');
export const deleteChat: ActionFunction1<string, IDeleteChat> = createAction('DELETE_CHAT');
export const setAboutPageOpen: ActionFunction1<boolean, ISetAboutPageOpen> = createAction('SET_ABOUT_PAGE_OPEN');
export const locationChanged: ActionFunctionAny<CommonAction> = createAction('@@router/LOCATION_CHANGE');
export const openCreateConversation: ActionFunction1<boolean, IOpenCreateConversation> = createAction('OPEN_CREATE_CONVERSATION');
export const createConversation: ActionFunction1<Partial<IChat>, ICreateChat> = createAction('CREATE_CONVERSATION');
export const openConversationManager: ActionFunction1<boolean, IOpenConversationManager> = createAction('OPEN_CONVERSATION_MANAGER');
export const changeChatData: ActionFunction1<IChangeChatDataPayload, IChangeChatData> = createAction('CHANGE_CHAT_DATA');






