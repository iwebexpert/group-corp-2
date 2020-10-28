import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {chatsLoadAction, chatsMessageSendAction, chatsAddFormAction} from '../actions/chats';
import {ChatAddForm} from "../components/ChatForm/ChatForm";
import {ChatList} from "../components/Chat-list";

class ChatListContainer extends Component {
constructor(props){
    super(props);
}
    componentDidMount(){
    console.log('mount is work')
       this.props.chatsLoadAction()
    }



    render() {
        return (
            <ChatList
            chatNames = {this.props}
            />
        )
    }
}

const mapStateProps = state =>{
    console.log(state);
 return {
     ...state
 }
}

function mapDispatchToProps(dispatch) {
    return {
        chatsLoadAction: () => dispatch(chatsLoadAction()),
    }
}
export default connect(mapStateProps, mapDispatchToProps)(ChatListContainer);
