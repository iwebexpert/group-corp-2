import {takeEvery, call, put, select} from "@redux-saga/core/effects";
import {DbWorker, IInputAuth, IInputReg, IInputUpdate} from "../../utils/DbWorker";
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
    updateUser, createConversation, changeChatData, setSelectedChat
} from "../actions";
import {changeChatTypes, messageTypes} from "../../configs/statuses";
import {push} from "connected-react-router";
import {
    IAuth,
    IChangeChatData,
    ICreateChat, IDeleteChat,
    ILoadChatMessages,
    ILoadContacts, IRegister,
    ISendMessage, ISetFrowardMessagePayload, IUpdateUser
} from "../reduxTypes/rdxActions";
import {SagaIterator} from "@redux-saga/types";
import {IChat, IContacts, IUser} from "../../types/globalTypes";

export function* sagaWatcher(): SagaIterator {
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

function* changeChatDataSaga(action: IChangeChatData): SagaIterator {
    try {
        const {newParams, sharedChatId}: { newParams: Partial<IChat>, sharedChatId: string } = action.payload;
        yield put(setLoading(true));
        yield call(DbWorker.pushChatData, {newParams, sharedChatId});
        yield put(setLoading(false));
        const {curUser}: { curUser: IUser } = yield select(s => s.app);
        switch (action.payload.typeChange) {
            case changeChatTypes.DeleteUser: {
                const user: IUser[] = yield call(DbWorker.getUserIdRange, action.payload.signalPayload);
                yield put(sendMessage({
                    text: `Пользователь ${curUser.name} исключил из беседы ${user[0].name}, теперь его сообщения не будут сюда приходить, а он не будет их получать`,
                    forwardMessages: null,
                    type: messageTypes.SYSTEM_TEXT_PUBLIC,
                    content: null
                }));
                break;
            }
            case changeChatTypes.AddUser: {
                const user: IUser[] = yield call(DbWorker.getUserIdRange, action.payload.signalPayload);
                yield put(sendMessage({
                    text: `Пользователь ${curUser.name} добавил ${user[0].name}. Добро пожаловать!!!`,
                    forwardMessages: null,
                    type: messageTypes.SYSTEM_TEXT_PUBLIC,
                    content: null
                }));
                break;
            }
            case changeChatTypes.Rename: {
                yield put(sendMessage({
                    text: `Пользователь ${curUser.name} переименовал беседу в "${action.payload.signalPayload}"`,
                    forwardMessages: null,
                    type: messageTypes.SYSTEM_TEXT_PUBLIC,
                    content: null
                }));
                break;
            }
        }
    } catch (e) {
        yield put(setLoading(false));
        yield put(setError({message: e.message}));
    }
}

function* createConversationSaga(action: ICreateChat): SagaIterator {
    try {
        const {members, title}: { members?: string[], title?: string } = action.payload;
        if (!members || !title) {
            yield put(setError({message: 'Неверные данные'}));
            return;
        }
        yield put(setLoading(true));
        const chat: IChat = yield call<typeof DbWorker.createConversation>(DbWorker.createConversation, {
            members,
            title
        });
        yield put(setLoading(false));
        yield put(push(`/messenger/chats/${chat._id}`));
        yield put(setSelectedChat(chat._id));
    } catch (e) {
        yield put(setLoading(false));
        yield put(setError({message: e.message}));
    }
}

function* sendMessageSaga(action: ISendMessage): SagaIterator {
    const {text, forwardMessages, type, content}: { text?: string, forwardMessages?: ISetFrowardMessagePayload | null, type?: messageTypes, content?: string[] | string | null } = action.payload;
    if (!type || typeof text === 'undefined' || typeof content === 'undefined') {
        yield put(setError({message: 'Неверные данные'}));
        return;
    }
    yield call<typeof DbWorker.sendMessage>(DbWorker.sendMessage, text, forwardMessages, {messageType: type, content});
}

function* loadChatMessagesSaga(action: ILoadChatMessages): SagaIterator {
    try {
        const sharedId: string = action.payload;
        yield put(setLoading(true));
        const chat: IChat | null = yield call(DbWorker.updateChat, sharedId);
        yield put(setLoading(false));
        if (chat) {
            const {chats: oldChats}: { chats: IChat[] } = yield select(s => s.app);
            yield put(setChats(oldChats.map((ch: IChat): IChat => ch._id === chat._id ? chat : ch)));
        } else {
            yield put(setError({message: 'Что-то пошло не так...'}));
        }
    } catch (e) {
        yield put(setLoading(false));
        yield put(setError({message: e.message}));
    }
}

function* loadContactsSaga(action: ILoadContacts): SagaIterator {
    try {
        const input: string = action.payload;
        yield put(setContactsLoading(true));
        const contacts: IContacts | null = yield call(DbWorker.updateContacts, input);
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

function* loadChatsSaga(): SagaIterator {
    try {
        yield put(setLoading(true));
        const chats: IChat[] | null = yield call(DbWorker.updateChats);
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

function* authSaga(action: IAuth): SagaIterator {
    try {
        const formData: IInputAuth = action.payload;
        yield put(setLoading(true));
        const user: IUser | null = yield call<typeof DbWorker.auth>(DbWorker.auth, formData);
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

function* registerSaga(action: IRegister): SagaIterator {
    try {
        const formData: IInputReg = action.payload;
        yield put(setLoading(true));
        const user: IUser | null = yield call(DbWorker.register, formData);
        yield put(setLoading(false));
        if (!user) {
            yield put(setError({message: 'Что-то пошло не так...'}));
        }
    } catch (e) {
        yield put(setLoading(false));
        yield put(setError({message: e.message}));
    }
}

function* updateUserSaga(action: IUpdateUser): SagaIterator {
    try {
        const formData: IInputUpdate = action.payload;
        yield put(setLoading(true));
        const user: IUser | null = yield call(DbWorker.updateUser, formData);
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

function* deleteChatSaga(action: IDeleteChat): SagaIterator {
    try {
        const id: string = action.payload;
        yield put(setLoading(true));
        const chat: IChat | null = yield call(DbWorker.deleteChat, id);
        yield put(setLoading(false));
        if (!chat) {
            yield put(setError({message: 'Что-то пошло не так...'}));
        }
    } catch (e) {
        yield put(setLoading(false));
        yield put(setError({message: e.message}));
    }
}

