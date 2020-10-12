import React from "react";
import List from "@material-ui/core/List";
import ChatSelector from "./ChatSelector";
import {useSelector} from "react-redux";
import './ChatsOnDialogPanel.scss';

export default ({searchInput}) => {
    const {chats} = useSelector(s => s.app);
    const regexp = searchInput ? new RegExp(`.*${searchInput}.*`, 'i'): /.*/;
    const findChats = chats.filter(ch => regexp.test(ch.title)).map(ch => <ChatSelector key={ch._id} chat={ch}/>);
    return (
        <div className={'ChatsSectionDlgPn'}>
            <List>
{
    findChats.length ? findChats : 'Чаты не найдены'
}
            </List>
        </div>
    );
};
