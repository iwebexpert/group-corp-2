import types from "./actionTypes";

export function changeWsStatus(payload) {
    return {
        type: types.UPDATE_WS_CONNECTION_STATUS,
        payload: payload
    }
}

export function sendMessage(payload) {
    return {
        type: types.SEND_MESSAGE,
        payload: payload
    }
}
