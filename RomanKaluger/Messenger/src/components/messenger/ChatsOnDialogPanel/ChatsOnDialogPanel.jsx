import React from "react";
import List from "@material-ui/core/List";
import ChatSelector from "./ChatSelector";
import {useSelector} from "react-redux";

export default () => {
    const {chats} = useSelector(s => s.app);
    return (
        <div className={'ChatsSectionDlgPn'}>
            <List>
{
    chats.length ? chats.map(ch => <ChatSelector key={ch._id} chat={ch}/>) : 'Чатов нет'
}
            </List>
        </div>
    );
};
