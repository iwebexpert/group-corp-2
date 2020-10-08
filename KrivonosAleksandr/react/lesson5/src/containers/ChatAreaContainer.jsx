import React, {Component} from "react";
import {connect} from 'react-redux';

import {addDialog} from "../actions/chats";
import {ChatArea} from "../components/areas/ChatArea";

class ChatAreaContainerClass extends  Component{

    onAddDialog = (newChats) => {
        this.props.addDialog({...newChats});
    }

    render(){
        let id = this.props.id;
        let newMsg = this.props.newMsg;
        return <ChatArea id={id} newMsg={newMsg} addDialog={this.onAddDialog}/>;
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
    }
}

export const ChatAreaContainer = connect(mapStateToProps, mapDispatchToProps)(ChatAreaContainerClass);














