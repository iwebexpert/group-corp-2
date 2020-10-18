import React from "react";
import List from "@material-ui/core/List";
import ChatSelector from "./ChatSelector";
import {useDispatch, useSelector} from "react-redux";
import './ChatsOnDialogPanel.scss';
import {openCreateConversation} from "../../../redux/actions";
import {CreateConversationWindow} from "../Conversation/CreateConversationWindow";

export default ({searchInput}) => {
    const {chats} = useSelector(s => s.app);
    const {createConversationOpen} = useSelector(s => s.system);
    const dispatch = useDispatch();
    const regexp = searchInput ? new RegExp(`.*${searchInput}.*`, 'i') : /.*/;
    const findChats = chats.filter(ch => regexp.test(ch.title)).map(ch => <ChatSelector key={ch._id} chat={ch}/>);
    return (
        <div className={'ChatsSectionDlgPn'}>
            {
                createConversationOpen
                    ? <CreateConversationWindow/>
                    : null
            }
            <div onClick={() => dispatch(openCreateConversation(true))} className="button">
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
