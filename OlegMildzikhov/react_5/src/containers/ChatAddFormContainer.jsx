import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {chatsLoadAction, chatsMessageSendAction, chatsAddFormAction} from '../actions/chats';
import {ChatAddForm} from "../components/ChatForm/ChatForm"

class ChatAddFormClass extends Component {
    constructor(props) {
        super(props);
        this.maxId = 3;
        this.addItem = this.addItem.bind(this);
    }

    addItem = (title)=> {
        this.props.chatsAddFormAction({title});
    }

    render() {
        return (
            <ChatAddForm onAdd={this.addItem}/>
        )
    }
}

function mapStateProps(state, ownProps) {
    const chats = state.chats.entries;
    return{
        chats: state
    }
}


function mapDispatchToProps(dispatch) {
    return {
        chatsAddFormAction: (title) => dispatch(chatsAddFormAction(title)),
    }
}

export const ChatAddFormContainer = connect(mapStateProps, mapDispatchToProps)(ChatAddFormClass);
