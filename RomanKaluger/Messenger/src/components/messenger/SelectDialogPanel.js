import React, { useRef, useCallback, useState, useEffect} from "react";
import SearchMessPanel from "./SearchMessPanel";
import {useDispatch, useSelector} from "react-redux";
import connectionConfig from "../../configs/connectionConfig";
import ChatsOnDialogPanel from "./ChatsOnDialogPanel";
import ContactsOnDialogPanel from "./ContactsOnDialogPanel";
import {setSelectedChat} from "../../redux/actions";
import ShortMenu from "./ShortMenu";
import {DbWorker} from "../../utils/DbWorker";
const categories = {
    CHATS: 'CHATS',
    PEOPLE: 'PEOPLE'
};
const initialState = {
    contacts: [],
    chats: [],
    category: categories.CHATS
};

async function find(input, curUser, setDialogs, selectedChat, dispatch) {
    try {
        if (curUser) {
            let defaultChatsRes, defaultContactsRes;
            if (!input) {
                defaultChatsRes = await DbWorker.authGet(`${connectionConfig.hostHttp}/chats/owner/${curUser._id}`, curUser);
                defaultContactsRes = await DbWorker.authGet(`${connectionConfig.hostHttp}/users/user/friends/ownerid/${curUser._id}`, curUser);
            } else {
                defaultChatsRes = await DbWorker.authGet(`${connectionConfig.hostHttp}/chats/title/${curUser._id}/${input}`, curUser);
                defaultContactsRes = await DbWorker.authGet(`${connectionConfig.hostHttp}/users/name/${input}`, curUser);
            }
            const defaultContacts = await defaultContactsRes.json();
            const defaultChats = await defaultChatsRes.json();
            if (selectedChat) {
                const newSelChatVersion = defaultChats.find(ch => ch.sharedId === selectedChat.sharedId) || null;
                dispatch(setSelectedChat(newSelChatVersion));
            }
            setDialogs(prev => ({
                contacts: defaultContacts,
                chats: defaultChats,
                category: prev.category
            }));
        }
    } catch (e) {
        setDialogs({
            contacts: [],
            chats: [],
            category: categories.CHATS
        });
    }
}

export default () => {
    const [dialogs, setDialogs] = useState(initialState);
    const {curUser, selectedChat} = useSelector(s => s.app);
    const dispatch = useDispatch();
    useEffect( () => {
        search();
    },[]);
    const search = useCallback((input) => {
        find(input, curUser, setDialogs, selectedChat, dispatch);
    }, [curUser, selectedChat]);
    useEffect(() => {
        if (connectionConfig.ws){
            const searchWsHandler = (e) => {
                const msg = JSON.parse(e.data);
                if (msg.type === 'CHATS' || msg.type === 'MESSAGE') {
                    search();
                }
            };
            connectionConfig.ws.addEventListener("message", searchWsHandler);
            return () => connectionConfig.ws.removeEventListener("message", searchWsHandler);
        }
    },[search]);
    const inputRef = useRef();
    const clearInput = useCallback(() => inputRef.current.value = '', []);
    return (
        <div className={'selectDialogPanel'}>
            <SearchMessPanel ref={inputRef} search={search}/>
            <div className={'CategorySelectorDlgPnCont'}>
                <div
                    onClick={() => setDialogs(prev => ({...prev, category: categories.CHATS}))}
                    className={`CategorySelectorDlgPn ${dialogs.category === categories.CHATS ? 'selectedTab' : ''}`}>
                    Чаты
                </div>
                <div onClick={() => setDialogs(prev => ({...prev, category: categories.PEOPLE}))}
                     className={`CategorySelectorDlgPn ${dialogs.category === categories.PEOPLE ? 'selectedTab' : ''}`}>
                    Контакты
                </div>
            </div>
            {
                dialogs.category === categories.CHATS
                    ? <ChatsOnDialogPanel chats={dialogs.chats}/>
                    : <ContactsOnDialogPanel clearInput={clearInput} users={dialogs.contacts}/>
            }
            <ShortMenu/>
        </div>
    );
}
