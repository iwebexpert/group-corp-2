import types from "./actionTypes";

export function changeWsStatus(payload) {
    return {
        type: types.UPDATE_WS_CONNECTION_STATUS,
        payload: payload
    }
}
export function setCurrentUser(payload) {
    return {
        type: types.SET_CURRENT_USER,
        payload: payload
    }
}
export function openUserProfile(payload) {
    return {
        type: types.OPENED_USER_PROFILE,
        payload: payload
    }
}
export function setSelectedChat(payload) {
    return {
        type: types.SET_SELECTED_CHAT,
        payload: payload
    }
}
export function setChats(payload) {
    return {
        type: types.SET_CHATS,
        payload: payload
    }
}
export function setForwardMessage(payload) {
    return {
        type: types.SET_FORWARD_MESSAGE,
        payload: payload
    }
}
export function setContacts(payload) {
    return {
        type: types.SET_CONTACTS,
        payload: payload
    }
}
export function setCommonViewImages(payload) {
    return {
        type: types.SET_COMMON_VIEW_IMAGES,
        payload: payload
    }
}
export function sendMessage(payload) {
    return {
        type: types.SEND_MESSAGE,
        payload: payload
    }
}
export function setLoading(payload) {
    return {
        type: types.LOADING,
        payload: payload
    }
}
export function setContactsLoading(payload) {
    return {
        type: types.CONTACTS_LOADING,
        payload: payload
    }
}

export function setError(payload) {
    return {
        type: types.ERROR,
        payload: payload
    }
}
export function loadChats(payload) {
    return {
        type: types.LOAD_CHATS,
    }
}
export function loadChatMessages(payload) {
    return {
        type: types.LOAD_CHAT_MESSAGES,
        payload: payload
    }
}
export function loadContacts(payload) {
    return {
        type: types.LOAD_CONTACTS,
        payload: payload
    }
}
export function auth(payload) {
    return {
        type: types.AUTH,
        payload: payload
    }
}
export function register(payload) {
    return {
        type: types.REGISTER,
        payload: payload
    }
}
export function updateUser(payload) {
    return {
        type: types.UPDATE_USER,
        payload: payload
    }
}
export function deleteChat(payload) {
    return {
        type: types.DELETE_CHAT,
        payload: payload
    }
}
export function setAboutPageOpen(payload) {
    return {
        type: types.SET_ABOUT_PAGE_OPEN,
        payload: payload
    }
}


