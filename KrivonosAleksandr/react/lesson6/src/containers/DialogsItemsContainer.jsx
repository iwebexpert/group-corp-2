import React, {Component} from "react";
import {connect} from 'react-redux';

import {addFriendListDialog, deleteFriendListDialog, showDeleteBtns} from "../actions/chats";
import {DialogsItems} from "../components/areas/chatAreas/messagesItems/DialogsItems";

class DialogsItemsContainerClass extends  Component{

    createNewDialog = (newDialog) => {
        let {onAddDialog} = this.props;

        let addDialog = {
            id: this.props.chats[this.props.chats.length - 1].id + 1,
            name: newDialog.name,
            lastMessage: "Начните диалог первым",
            image: '',
            fire: true,
            answerCount: 0,
            userName: '',
            botMessages: [],
            messages: []
        }

        onAddDialog(addDialog);

        let filteredFriends = this.props.friendsList.filter((item)=>item.id !== newDialog.id);
        this.props.deleteFriendListDialog({filteredFriends});
    }

    toggleShowDeleteBtns = () => {
        let show = !this.props.activateDelete;
        this.props.showDeleteBtns(show);
    }

    deleteDialog = (dialog) => {
        // console.log(dialogId);
        let filteredDialogs = this.props.chats.filter((item)=>item.id !== dialog.id);
        this.props.onDeleteDialog(filteredDialogs);
        this.props.addFriendListDialog(dialog);
    }

    render() {
        let chats = this.props.chats;
        let friends = this.props.friendsList;
        return <DialogsItems chats={chats} friends={friends} onAddDialog={this.createNewDialog} showDeleteBtns={this.toggleShowDeleteBtns} onDeleteDialog={this.deleteDialog}/>;
    }
}

function mapStateToProps(state, ownProps) {
    const chats = state.chats.entries;
    const activateDelete = state.chats.activateDelete;
    const {onAddDialog, onDeleteDialog} = ownProps;
    const friendsList = state.chats.friends;
    return {activateDelete, chats, friendsList, onAddDialog, onDeleteDialog};
}

function mapDispatchToProps(dispatch){
    return {
        addFriendListDialog: (newDialog) => dispatch(addFriendListDialog(newDialog)),
        deleteFriendListDialog: (friendsList, idToDelete) => dispatch(deleteFriendListDialog(friendsList, idToDelete)),
        showDeleteBtns: (show) => dispatch(showDeleteBtns(show)),
    }
}

export const DialogsItemsContainer = connect(mapStateToProps, mapDispatchToProps)(DialogsItemsContainerClass);