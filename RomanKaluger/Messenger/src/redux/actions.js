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

