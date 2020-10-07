import React from 'react';
import {connect} from 'react-redux';

import {ChatsList} from '../components/ChatsList';
import {chatsLoadAction, chatsListSendAction} from '../actions/chats';

class ChatsListContainerClass extends React.Component {
    
    componentDidMount(){
        this.props.chatsLoadAction();
    }

    chatAddHandler = (newchat) => {
        const {chatsListSendAction} = this.props;
        chatsListSendAction({
            author: newchat,
            avatar: 'https://cityblank.ru/upload/iblock/cc4/cc47d6df370960cbe120d01e999abfeb.gif',
        });
    };

    render(){
        const {chatsLoad} = this.props;
        return(chatsLoad ? <ChatsList chats={chatsLoad} onAdd={this.chatAddHandler}  /> : <div>Данные не получены</div>)
    }
}

function mapStateToProps(state, ownProps){
    const {entries, loading} = state.chats;

    let chatsLoad = null;

    if(loading){
        chatsLoad = entries;
    }
 
    return {
        chatsLoad,
    };
}

function mapDispatchToProps(dispatch){
    return {
        chatsLoadAction: () => dispatch(chatsLoadAction()),
        chatsListSendAction: (chat) => dispatch(chatsListSendAction(chat)),
    }
}

export const ChatsListContainer = connect(mapStateToProps, mapDispatchToProps)(ChatsListContainerClass);
