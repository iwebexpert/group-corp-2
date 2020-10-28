import React, {Component, useEffect} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {chatsLoadAction, chatsMessageSendAction, chatsAddFormAction} from '../actions/chats';
import {Header} from "../components/Messenger-Header";
import {profileLoadActions} from "../actions/profile";

class HeaderContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const index = this.props.infoChat;
        const arr = this.props.chats.entries[index];

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
