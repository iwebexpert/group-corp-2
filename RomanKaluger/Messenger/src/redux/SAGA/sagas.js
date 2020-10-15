import {takeEvery, call, put, select} from "@redux-saga/core/effects";
import actionTypes from "../actionTypes";
import {DbWorker} from "../../utils/DbWorker";
import {
    openUserProfile,
    setChats,
    setContacts,
    setContactsLoading,
    setCurrentUser,
    setError,
    setLoading
} from "../actions";

export function* sagaWatcher() {
    yield takeEvery(actionTypes.SEND_MESSAGE, sendMessage);
    yield takeEvery(actionTypes.LOAD_CHATS, loadChats);
    yield takeEvery(actionTypes.LOAD_CONTACTS, loadContacts);
    yield takeEvery(actionTypes.LOAD_CHAT_MESSAGES, loadChatMessages);
    yield takeEvery(actionTypes.AUTH, auth);
    yield takeEvery(actionTypes.REGISTER, register);
    yield takeEvery(actionTypes.UPDATE_USER, updateUser);
    yield takeEvery(actionTypes.DELETE_CHAT, deleteChat);

}
function* sendMessage(action) {
    const {msg, forwardMessage, type, content} = action.payload;
    yield call(DbWorker.sendMessage, msg, forwardMessage, {messageType: type, content});
}
function* loadChatMessages(action) {
    try {
        const sharedId = action.payload;
        yield put(setLoading(true));
        const chat = yield call(DbWorker.updateChat, sharedId);
        yield put(setLoading(false));
        if (chat) {
            const {chats: oldChats} = yield select(s => s.app);
            yield put(setChats(oldChats.map(ch => ch._id === chat._id ? chat : ch)));
        } else {
            yield put(setError({message: 'Что-то пошло не так...'}));
        }
    } catch (e) {
        yield put(setError({message: e.message}));
    }
}
function* loadContacts(action) {
    try {
        const input = action.payload;
        yield put(setContactsLoading(true));
        const contacts = yield call(DbWorker.updateContacts, input);
        yield put(setContactsLoading(false));
        if (contacts) {
            yield put(setContacts(contacts));
        } else {
            yield put(setError({message: 'Что-то пошло не так...'}));
        }
    } catch (e) {
        yield put(setError({message: e.message}));
    }
}
function* loadChats() {
    try {
        yield put(setLoading(true));
        const chats = yield call(DbWorker.updateChats);
        yield put(setLoading(false));
        if (chats) {
            yield put(setChats(chats));
        } else {
            yield put(setError({message: 'Что-то пошло не так...'}));
        }
    } catch (e) {
        yield put(setError({message: e.message}));
    }
}
function* auth(action) {
    try {
        const formData = action.payload;
        yield put(setLoading(true));
        const user = yield call(DbWorker.auth, formData);
        yield put(setLoading(false));
        if (user) {
            yield put(setCurrentUser(user));
        } else {
            yield put(setError({message: 'Что-то пошло не так...'}));
        }
    } catch (e) {
        yield put(setError({message: e.message}));
    }
}
function* register(action) {
    try {
        const formData = action.payload;
        yield put(setLoading(true));
        const user = yield call(DbWorker.register, formData);
        yield put(setLoading(false));
        if (!user) {
            yield put(setError({message: 'Что-то пошло не так...'}));
        }
    } catch (e) {
        yield put(setError({message: e.message}));
    }
}
function* updateUser(action) {
    try {
        const formData = action.payload;
        yield put(setLoading(true));
        const user = yield call(DbWorker.updateUser, formData);
        yield put(setLoading(false));
        if (user) {
            yield put(setCurrentUser(user));
            yield put(openUserProfile(user));
        } else {
            yield put(setError({message: 'Что-то пошло не так...'}));
        }
    } catch (e) {
        yield put(setError({message: e.message}));
    }
}
function* deleteChat(action) {
    try {
        const id = action.payload;
        yield put(setLoading(true));
        const chat = yield call(DbWorker.deleteChat, id);
        yield put(setLoading(false));
        if (!chat) {
            yield put(setError({message: 'Что-то пошло не так...'}));
        }
    } catch (e) {
        yield put(setError({message: e.message}));
    }
}

