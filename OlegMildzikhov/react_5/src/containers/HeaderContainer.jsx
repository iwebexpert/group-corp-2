import React, {Component} from 'react';
import {connect} from 'react-redux';
import {chatsLoadAction, chatsMessageSendAction, chatsAddFormAction} from '../actions/chats';
import {Header} from "components/Messenger-Header";

class HeaderContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const index = this.props.infoChat;
        const arr = this.props.chats.entries[index];
        console.log("HEADER",index, this.props, this.props.chats.entries[index]);
        return (
            <Header
                titleChat = {arr}
            />
        )
    }
}

const mapStateProps = state =>{
    return {
        ...state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        chatsLoadAction: () => dispatch(chatsLoadAction()),
        chatsAddFormAction: (newItem) => dispatch(chatsAddFormAction(newItem)),
    }
}
export default connect(mapStateProps, mapDispatchToProps)(HeaderContainer);
