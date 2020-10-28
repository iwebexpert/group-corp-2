import React from "react";
import {useSelector, useDispatch} from 'react-redux';

import {addFriendListDialog, deleteFriendListDialogAction, showDeleteBtns} from "../actions/chats";
import {DialogsItems} from "../components/areas/chatAreas/messagesItems/DialogsItems";

export const DialogsItemsContainer = ({onAddDialog, onDeleteDialog}) => {

    const dispatch = useDispatch();
    const chats = useSelector((state) => state.chats.entries);
    const friendsList = useSelector((state) => state.chats.friends);
    const activateDelete = useSelector((state) => state.chats.activateDelete);


    const createNewDialog = (newDialog) => {

        let addDialog = {
            id: chats[chats.length - 1].id + 1,
            name: newDialog.name,
            lastMessage: "Начните диалог первым",
            image: '',
            fire: false,
            answerCount: 0,
            userName: '',
            botMessages: [],
            messages: []
        }

        onAddDialog(addDialog);

        let filteredFriends = friendsList.filter((item) => item.id !== newDialog.id);
        dispatch(deleteFriendListDialogAction({filteredFriends}, newDialog.id));
    }

    const toggleShowDeleteBtns = () => {
        let show = !activateDelete;
        dispatch(showDeleteBtns(show));
    }

    const deleteDialog = (dialog) => {
        let filteredDialogs = chats.filter((item) => item.id !== dialog.id);
        dispatch(onDeleteDialog(filteredDialogs));
        dispatch(addFriendListDialog(dialog));
    }

    return <DialogsItems chats={chats} friends={friendsList} onAddDialog={createNewDialog}
                         showDeleteBtns={toggleShowDeleteBtns} onDeleteDialog={deleteDialog}/>;

}