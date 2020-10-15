import React, {useRef, useCallback, useState, useEffect} from "react";
import SearchMessPanel from "./SearchMessPanel";
import {useDispatch, useSelector} from "react-redux";
import connectionConfig from "../../../configs/connectionConfig";
import ChatsOnDialogPanel from "../ChatsOnDialogPanel/ChatsOnDialogPanel";
import ContactsOnDialogPanel from "../ContactsDialogPanel/ContactsOnDialogPanel";
import ShortMenu from "./ShortMenu";
import classNames from 'classnames';
import {categories} from "./categories";
import Backdrop from "@material-ui/core/Backdrop";
import './SelectDialogPanel.scss';
import {loadChatMessages, loadChats, loadContacts, setForwardMessage} from "../../../redux/actions";
import CircularProgress from "@material-ui/core/CircularProgress";

const initialState = {
    contacts: [],
    chats: [],
    category: categories.CHATS
};

export default () => {
    const [dialogs, setDialogs] = useState(initialState);
    const {curUser} = useSelector(s => s.app);
    const {forwardMessage, contactsLoading} = useSelector(s => s.system);
    const dispatch = useDispatch();
    const [input, setInput] = useState('');
    useEffect(() => {
        search();
    }, []);
    const search = useCallback((input) => {
        dispatch(loadChats());
        dispatch(loadContacts(input));
        }, [curUser]);
    useEffect(() => {
        if (connectionConfig.ws) {
            const searchWsHandler = (e) => {
                const msg = JSON.parse(e.data);
                switch (msg.type) {
                    case 'CHATS': {
                        dispatch(loadChats());
                        break;
                    }
                    case 'MESSAGE': {
                        dispatch(loadChatMessages(msg.body.sharedId));
                        break;
                    }
                    case 'CONTACTS': {
                        dispatch(loadContacts(input));
                        break;
                    }
                    default: throw new Error('unknown action')
                }
            };
            connectionConfig.ws.addEventListener("message", searchWsHandler);
            return () => connectionConfig.ws.removeEventListener("message", searchWsHandler);
        }
    }, [search, connectionConfig.ws, curUser]);
    const clearInput = useCallback(() => setInput(''), []);
    const categoryPeople = classNames('CategorySelectorDlgPn', {selectedTab: dialogs.category === categories.PEOPLE});
    const categoryChats = classNames('CategorySelectorDlgPn', {selectedTab: dialogs.category === categories.CHATS});
    return (
        <>
            <Backdrop open={Boolean(forwardMessage && !forwardMessage.chat)}>
                <div className={'selectChatBackdropContainer'}>
                    <ChatsOnDialogPanel />
                    <img onClick={() => dispatch(setForwardMessage(null))} className={'interactiveButton'} src="https://img.icons8.com/color/48/000000/delete-sign.png"/>
                </div>
            </Backdrop>
            <div className={'selectDialogPanel'}>
                <SearchMessPanel input={input} setInput={setInput}/>
                <div className={'CategorySelectorDlgPnCont'}>
                    <div
                        onClick={() => setDialogs(prev => ({...prev, category: categories.CHATS}))}
                        className={categoryChats}>
                        Чаты
                    </div>
                    <div onClick={() => setDialogs(prev => ({...prev, category: categories.PEOPLE}))}
                         className={categoryPeople}>
                        Контакты
                    </div>
                </div>
                {
                    contactsLoading
                        ? <CircularProgress/>
                        :   dialogs.category === categories.CHATS
                             ? <ChatsOnDialogPanel searchInput={input}/>
                             : <ContactsOnDialogPanel clearInput={clearInput}/>
                }
                <ShortMenu/>
            </div>
        </>
    );
}
