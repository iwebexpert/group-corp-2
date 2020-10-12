import React, {Component} from "react";
import {connect} from 'react-redux';
import {push} from 'connected-react-router'

import {addDialog, deleteDialog, addFriendListDialog} from "../actions/chats";
import {ChatArea} from "../components/areas/ChatArea";

class ChatAreaContainerClass extends Component{

    onAddDialog = (newChats) => {
        this.props.addDialog({...newChats});
        this.props.redirect(newChats.id);
    }

    onDeleteDialog = (dialogs) => {
        this.props.redirect('new');
        this.props.deleteDialog(dialogs);
    }

    render(){
        let id = this.props.id;
        let newMsg = this.props.newMsg;
        return <ChatArea id={id} newMsg={newMsg} addDialog={this.onAddDialog} deleteDialog={this.onDeleteDialog}/>;
    }
}

function mapStateToProps(state, ownProps) {
    const chats = state.chats.entries;
    const {id, newMsg} = ownProps;
    return {
        chats,
        id,
        newMsg
    };
}

function mapDispatchToProps(dispatch){
    return {
        addDialog: (newChats) => dispatch(addDialog(newChats)),
        deleteDialog: (dialogs) => dispatch(deleteDialog(dialogs)),
        redirect: (chatId) => dispatch(push('/chats/' + chatId)),
    }
}

export const ChatAreaContainer = connect(mapStateToProps, mapDispatchToProps)(ChatAreaContainerClass);














