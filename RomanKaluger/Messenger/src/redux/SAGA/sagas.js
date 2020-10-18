import {takeEvery, call, put, select} from "@redux-saga/core/effects";
import {DbWorker} from "../../utils/DbWorker";
import {
    auth, deleteChat,
    loadChatMessages,
    loadChats, loadContacts,
    openUserProfile, sendMessage,
    setChats,
    setContacts,
    setContactsLoading,
    setCurrentUser,
    setError,
    setLoading,
    register,
    updateUser, createConversation, changeChatData
} from "../actions";
import {changeChatTypes, messageTypes} from "../../configs/statuses";

export function* sagaWatcher() {
    yield takeEvery(sendMessage, sendMessageSaga);
    yield takeEvery(loadChats, loadChatsSaga);
    yield takeEvery(loadContacts, loadContactsSaga);
    yield takeEvery(loadChatMessages, loadChatMessagesSaga);
    yield takeEvery(auth, authSaga);
    yield takeEvery(register, registerSaga);
    yield takeEvery(updateUser, updateUserSaga);
    yield takeEvery(deleteChat, deleteChatSaga);
    yield takeEvery(createConversation, createConversationSaga);
    yield takeEvery(changeChatData, changeChatDataSaga);
}
function* changeChatDataSaga(action) {
    try {
        const {newParams, sharedChatId} = action.payload;
        yield put(setLoading(true));
        yield call(DbWorker.pushChatData, {newParams, sharedChatId});
        yield put(setLoading(false));
        const { curUser } = yield select(s => s.app);
        switch (action.payload.typeChange) {
            case changeChatTypes.deleteUser: {
                const user = yield call(DbWorker.getUserIdRange,action.payload.signalPayload);
                yield put(sendMessage({
                    msg: `Пользователь ${curUser.name} исключил из беседы ${user[0].name}, теперь его сообщения не будут сюда приходить, а он не будет их получать`,
                    forwardMessage: null,
                    type: messageTypes.SYSTEM_TEXT_PUBLIC,
                    content: null}));
                break;
            }
            case changeChatTypes.addUser: {
                const user = yield call(DbWorker.getUserIdRange,action.payload.signalPayload);
                yield put(sendMessage({
                    msg: `Пользователь ${curUser.name} добавил ${user[0].name}. Добро пожаловать!!!`,
                    forwardMessage: null,
                    type: messageTypes.SYSTEM_TEXT_PUBLIC,
                    content: null}));
                break;
            }
            case changeChatTypes.rename: {
                yield put(sendMessage({
                    msg: `Пользователь ${curUser.name} переименовал беседу в "${action.payload.signalPayload}"`,
                    forwardMessage: null,
                    type: messageTypes.SYSTEM_TEXT_PUBLIC,
                    content: null}));
                break;
            }
        }
    } catch (e) {
        yield put(setLoading(false));
        yield put(setError({message: e.message}));
    }
}
function* createConversationSaga(action) {
    try {
        const {members, title} = action.payload;
        yield put(setLoading(true));
        yield call(DbWorker.createConversation, {members, title});
        yield put(setLoading(false));
    } catch (e) {
        yield put(setLoading(false));
        yield put(setError({message: e.message}));
    }
}
function* sendMessageSaga(action) {
    const {msg, forwardMessage, type, content} = action.payload;
    yield call(DbWorker.sendMessage, msg, forwardMessage, {messageType: type, content});
}
function* loadChatMessagesSaga(action) {
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
        yield put(setLoading(false));
        yield put(setError({message: e.message}));
    }
}
function* loadContactsSaga(action) {
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
        yield put(setContactsLoading(false));
        yield put(setError({message: e.message}));
    }
}
function* loadChatsSaga() {
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
        yield put(setLoading(false));
        yield put(setError({message: e.message}));
    }
}
function* authSaga(action) {
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
        yield put(setLoading(false));
        yield put(setError({message: e.message}));
    }
}
function* registerSaga(action) {
    try {
        const formData = action.payload;
        yield put(setLoading(true));
        const user = yield call(DbWorker.register, formData);
        yield put(setLoading(false));
        if (!user) {
            yield put(setError({message: 'Что-то пошло не так...'}));
        }
    } catch (e) {
        yield put(setLoading(false));
        yield put(setError({message: e.message}));
    }
}
function* updateUserSaga(action) {
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
        yield put(setLoading(false));
        yield put(setError({message: e.message}));
    }
}
function* deleteChatSaga(action) {
    try {
        const id = action.payload;
        yield put(setLoading(true));
        const chat = yield call(DbWorker.deleteChat, id);
        yield put(setLoading(false));
        if (!chat) {
            yield put(setError({message: 'Что-то пошло не так...'}));
        }
    } catch (e) {
        yield put(setLoading(false));
        yield put(setError({message: e.message}));
    }
}

