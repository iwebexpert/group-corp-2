import React, {Component} from "react";
import {connect} from 'react-redux';

import {deleteFriendListDialog} from "../actions/chats";
import {DialogsItems} from "../components/areas/chatAreas/messagesItems/DialogsItems";

class DialogsItemsContainerClass extends  Component{

    createNewDialog = (newDialog) => {
        let {onAddDialog} = this.props;

        let addDialog = {
            id: this.props.chats[this.props.chats.length - 1].id + 1,
            name: newDialog.name,
            lastMessage: "Начните диалог первым",
            image: '',
            answerCount: 0,
            userName: '',
            botMessages: [],
            messages: []
        }

        onAddDialog(addDialog);

        let filteredFriends = this.props.friendsList.filter((item)=>item.id !== newDialog.id);
        this.props.deleteFriendListDialog({filteredFriends});
    }

    render() {
        let chats = this.props.chats;
        let friends = this.props.friendsList;
        return <DialogsItems chats={chats} friends={friends} onAddDialog={this.createNewDialog} />;
    }
}

function mapStateToProps(state, ownProps) {
    const chats = state.chats.entries;
    const {onAddDialog} = ownProps;
    const friendsList = state.chats.friends;
    return {chats, friendsList, onAddDialog};
}

function mapDispatchToProps(dispatch){
    return {
        deleteFriendListDialog: (friendsList, idToDelete) => dispatch(deleteFriendListDialog(friendsList, idToDelete)),
    }
}

export const DialogsItemsContainer = connect(mapStateToProps, mapDispatchToProps)(DialogsItemsContainerClass);