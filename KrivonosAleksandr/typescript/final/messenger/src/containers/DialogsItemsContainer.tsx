import React from "react";
import {useSelector, useDispatch} from 'react-redux';

import {deleteFriendListDialogAction} from "../actions/chats";
import {DialogsItems} from "../components/areas/chatAreas/messagesItems/DialogsItems";
import {AppState} from "../reducers";

type DialogsItemsContainerType = {
    onAddDialog: (dialog: chatsPayload) => void;
}

export const DialogsItemsContainer: React.FC<DialogsItemsContainerType> = ({onAddDialog}) => {

    const dispatch = useDispatch();
    const chats = useSelector((state: AppState) => state.chats.entries);
    const friendsList = useSelector((state: AppState) => state.chats.friends);

    const createNewDialog = (newDialog: newDialog) => {

        let addDialog: chatsPayload = {
            id: chats[chats.length - 1].id + 1,
            name: newDialog.name,
            lastMessage: "Начните диалог первым",
            fire: false,
            answerCount: 0,
            userName: '',
            botMessages: [],
            messages: []
        }

        onAddDialog(addDialog);

        let filteredFriends: [] = friendsList.filter((item: friendsPayload) => item.id !== newDialog.id);
        dispatch(deleteFriendListDialogAction(filteredFriends, newDialog.id));
    }

    return <DialogsItems chats={chats} friends={friendsList} onAddDialog={createNewDialog}/>;

}