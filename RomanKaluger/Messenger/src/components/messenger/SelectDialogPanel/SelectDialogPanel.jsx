import React, {useRef, useCallback, useState, useEffect} from "react";
import SearchMessPanel from "./SearchMessPanel";
import {useDispatch, useSelector} from "react-redux";
import connectionConfig from "../../../configs/connectionConfig";
import ChatsOnDialogPanel from "../ChatsOnDialogPanel/ChatsOnDialogPanel";
import ContactsOnDialogPanel from "../ContactsDialogPanel/ContactsOnDialogPanel";
import ShortMenu from "./ShortMenu";
import classNames from 'classnames';
import find from "./findChats";
import {categories} from "./categories";
import Backdrop from "@material-ui/core/Backdrop";
import './SelectDialogPanel.scss';
import {setForwardMessage} from "../../../redux/actions";

const initialState = {
    contacts: [],
    chats: [],
    category: categories.CHATS
};

export default () => {
    const [dialogs, setDialogs] = useState(initialState);
    const {curUser} = useSelector(s => s.app);
    const {forwardMessage} = useSelector(s => s.system);
    const dispatch = useDispatch();

    useEffect(() => {
        search();
    }, []);
    const search = useCallback((input) => {
        find(input, curUser, setDialogs, dispatch);
    }, [curUser]);
    useEffect(() => {
        if (connectionConfig.ws) {
            const searchWsHandler = (e) => {
                const msg = JSON.parse(e.data);
                if (msg.type === 'CHATS' || msg.type === 'MESSAGE' || 'CONTACTS') {
                    search();
                }
            };
            connectionConfig.ws.addEventListener("message", searchWsHandler);
            return () => connectionConfig.ws.removeEventListener("message", searchWsHandler);
        }
    }, [search]);
    const inputRef = useRef();
    const clearInput = useCallback(() => inputRef.current.value = '', []);
    const categoryPeople = classNames('CategorySelectorDlgPn', {selectedTab: dialogs.category === categories.PEOPLE});
    const categoryChats = classNames('CategorySelectorDlgPn', {selectedTab: dialogs.category === categories.CHATS});
    return (
        <>
            <Backdrop open={Boolean(forwardMessage && !forwardMessage.chat)}>
                <div className={'selectChatBackdropContainer'}>
                    <ChatsOnDialogPanel/>
                    <img onClick={() => dispatch(setForwardMessage(null))} className={'interactiveButton'} src="https://img.icons8.com/color/48/000000/delete-sign.png"/>
                </div>
            </Backdrop>
            <div className={'selectDialogPanel'}>
                <SearchMessPanel ref={inputRef} search={search}/>
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
                    dialogs.category === categories.CHATS
                        ? <ChatsOnDialogPanel/>
                        : <ContactsOnDialogPanel clearInput={clearInput}/>
                }
                <ShortMenu/>
            </div>
        </>
    );
}
