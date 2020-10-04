import {takeEvery} from "@redux-saga/core/effects";
import actionTypes from "../actionTypes";

export function* sagaWatcher() {
    yield takeEvery(actionTypes.SET_CURRENT_USER, currentUserSet);
}
function* currentUserSet(action) {
    if (action.payload === null) {
        localStorage.curUser = '';
        return;
    }
    localStorage.curUser = JSON.stringify(action.payload);
}
