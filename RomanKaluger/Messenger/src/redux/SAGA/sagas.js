import {takeEvery, call} from "@redux-saga/core/effects";
import actionTypes from "../actionTypes";
import {DbWorker} from "../../utils/DbWorker";

export function* sagaWatcher() {
    yield takeEvery(actionTypes.SEND_MESSAGE, sendMessage);
}
function* sendMessage(action) {
    const {msg, forwardMessage, type, content} = action.payload;
    yield call(DbWorker.sendMessage, msg, forwardMessage, {messageType: type, content});
}

