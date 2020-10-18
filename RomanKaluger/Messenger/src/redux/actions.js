import {createAction} from "redux-actions";
export const changeWsStatus = createAction('UPDATE_WS_CONNECTION_STATUS');
export const setCurrentUser = createAction('SET_CURRENT_USER');
export const openUserProfile = createAction('OPENED_USER_PROFILE');
export const setSelectedChat = createAction('SET_SELECTED_CHAT');
export const setChats = createAction('SET_CHATS');
export const setForwardMessage = createAction('SET_FORWARD_MESSAGE');
export const setContacts = createAction('SET_CONTACTS');
export const setCommonViewImages = createAction('SET_COMMON_VIEW_IMAGES');
export const sendMessage = createAction('SEND_MESSAGE');
export const setLoading = createAction('LOADING');
export const setContactsLoading = createAction('CONTACTS_LOADING');
export const setError = createAction('ERROR');
export const loadChats = createAction('LOAD_CHATS');
export const loadChatMessages = createAction('LOAD_CHAT_MESSAGES');
export const loadContacts = createAction('LOAD_CONTACTS');
export const auth = createAction('AUTH');
export const register = createAction('REGISTER');
export const updateUser = createAction('UPDATE_USER');
export const deleteChat = createAction('DELETE_CHAT');
export const setAboutPageOpen = createAction('SET_ABOUT_PAGE_OPEN');
export const locationChanged = createAction('@@router/LOCATION_CHANGE');
export const openCreateConversation = createAction('OPEN_CREATE_CONVERSATION');
export const createConversation = createAction('CREATE_CONVERSATION');
export const openConversationManager = createAction('OPEN_CONVERSATION_MANAGER');
export const changeChatData = createAction('CHANGE_CHAT_DATA');






