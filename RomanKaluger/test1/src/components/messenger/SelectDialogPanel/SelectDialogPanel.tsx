import React, {useCallback, useState, useEffect} from "react";
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
import Badge from "@material-ui/core/Badge";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MailIcon from '@material-ui/icons/Mail';
import {IChat, IContacts} from "../../../types/globalTypes";
import {IAppState, ICombinedState, ISystemState} from "../../../redux/reduxTypes/rdx";
import {Dispatch} from "redux";

interface IDialogsState {
    contacts: IContacts[],
    chats: IChat[],
    category: categories;
}

const initialState: IDialogsState = {
    contacts: [],
    chats: [],
    category: categories.CHATS
};

enum MessageTypes {
    CHATS = 'CHATS',
    MESSAGE = 'MESSAGE',
    CONTACTS = 'CONTACTS'
}

const SelectDialogPanel: React.FC = () => {
    const [dialogs, setDialogs] = useState<IDialogsState>(initialState);
    const {curUser, contacts, chats} = useSelector<ICombinedState, IAppState>(s => s.app);
    const {forwardMessage, contactsLoading} = useSelector<ICombinedState, ISystemState>(s => s.system);
    const dispatch: Dispatch = useDispatch();
    const [input, setInput] = useState<string>('');
    useEffect((): void => {
        search('');
    }, []);
    const search = useCallback((input: string): void => {
        dispatch(loadChats());
        dispatch(loadContacts(input));
    }, [curUser]);
    useEffect((): (() => void) | undefined => {
        if (connectionConfig.ws) {
            const searchWsHandler = (e: MessageEvent<string>): void => {
                const msg: { type: MessageTypes; body: { sharedId: string } } = JSON.parse(e.data);
                switch (msg.type) {
                    case MessageTypes.CHATS: {
                        dispatch(loadChats());
                        break;
                    }
                    case MessageTypes.MESSAGE: {
                        dispatch(loadChatMessages(msg.body.sharedId));
                        break;
                    }
                    case MessageTypes.CONTACTS: {
                        dispatch(loadContacts(input));
                        break;
                    }
                    default:
                        throw new Error('unknown action')
                }
            };
            connectionConfig.ws.addEventListener("message", searchWsHandler);
            return (): void => {
                if (connectionConfig.ws) connectionConfig.ws.removeEventListener("message", searchWsHandler)
            };
        }
    }, [search, connectionConfig.ws, curUser]);
    const clearInput: () => void = useCallback((): void => {
        setInput('')
    }, []);
    const categoryPeople: string = classNames('CategorySelectorDlgPn', {selectedTab: dialogs.category === categories.PEOPLE});
    const categoryChats: string = classNames('CategorySelectorDlgPn', {selectedTab: dialogs.category === categories.CHATS});
    const unreadChats: number = chats.reduce((acc: number, x: IChat): number => acc += x.unReadCount ? 1 : 0, 0);
    return (
        <>
            <Backdrop open={Boolean(forwardMessage && !forwardMessage.chat)}>
                <div className={'selectChatBackdropContainer'}>
                    <ChatsOnDialogPanel searchInput={''}/>
                    <img onClick={(): void => {
                        dispatch(setForwardMessage(null))
                    }} className={'interactiveButton'}
                         src="https://img.icons8.com/color/48/000000/delete-sign.png"/>
                </div>
            </Backdrop>
            <div className={'selectDialogPanel'}>
                <SearchMessPanel input={input} setInput={setInput}/>
                <div className={'CategorySelectorDlgPnCont'}>
                    <div
                        onClick={(): void => setDialogs((prev: IDialogsState): IDialogsState => ({
                            ...prev,
                            category: categories.CHATS
                        }))}
                        className={categoryChats}>
                        Чаты
                        <Badge badgeContent={unreadChats} showZero color="primary">
                            <MailIcon/>
                        </Badge>
                    </div>
                    <div onClick={(): void => setDialogs((prev: IDialogsState): IDialogsState => ({
                        ...prev,
                        category: categories.PEOPLE
                    }))}
                         className={categoryPeople}>
                        <span>Контакты</span>
                        <Badge badgeContent={contacts.subscribers.length} showZero color="primary">
                            <PersonAddIcon/>
                        </Badge>
                    </div>
                </div>
                <div className={'selectDialogPanelSelectorsCont'}>
                    {
                        contactsLoading
                            ? <CircularProgress/>
                            : dialogs.category === categories.CHATS
                            ? <ChatsOnDialogPanel searchInput={input}/>
                            : <ContactsOnDialogPanel clearInput={clearInput}/>
                    }
                </div>
                <ShortMenu/>
            </div>
        </>
    );
};
export default SelectDialogPanel;
