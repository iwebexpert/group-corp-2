import React from "react";
import List from "@material-ui/core/List";
import ChatSelector from "./ChatSelector";
import {useDispatch, useSelector} from "react-redux";
import './ChatsOnDialogPanel.scss';
import {openCreateConversation} from "../../../redux/actions";
import {CreateConversationWindow} from "../Conversation/CreateConversationWindow";
import {IAppState, ICombinedState, ISystemState} from "../../../redux/reduxTypes/rdx";
import {Dispatch} from "redux";
import {IChat} from "../../../types/globalTypes";

type propTypes = {
    searchInput: string
};
const ChatsOnDialogPanel: React.FC<propTypes> = ({searchInput}) => {
    const {chats} = useSelector<ICombinedState, IAppState>(s => s.app);
    const {createConversationOpen} = useSelector<ICombinedState, ISystemState>(s => s.system);
    const dispatch: Dispatch = useDispatch();
    const regexp: RegExp = searchInput ? new RegExp(`.*${searchInput}.*`, 'i') : /.*/;
    const findChats: React.ReactNode[] = chats.filter((ch: IChat): boolean => regexp.test(ch.title)).map((ch: IChat): React.ReactNode =>
        <ChatSelector key={ch._id} chat={ch}/>);
    return (
        <div className={'ChatsSectionDlgPn'}>
            {
                createConversationOpen
                    ? <CreateConversationWindow/>
                    : null
            }
            <div onClick={(): void => {
                dispatch(openCreateConversation(true))
            }} className="button">
                Создать беседу
            </div>
            <List>
                {
                    findChats.length ? findChats : 'Чаты не найдены'
                }
            </List>
        </div>
    );
};
export default ChatsOnDialogPanel;
