import React from 'react';
import {connect} from 'react-redux';
import { nanoid } from 'nanoid';

import {ChatsList} from '../components/ChatsList';
import {chatsLoadAction, chatsListSendAction} from '../actions/chats';

class ChatsListContainerClass extends React.Component {
    
    componentDidMount(){
        console.log('chatsLoadActionjjjjjjjjjjjjjjjjjjjjjjjjjjj')
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
        console.log('render', chatsLoad)
        return(chatsLoad ? <ChatsList chats={chatsLoad} onAdd={this.chatAddHandler}  /> : <div>Данные не получены</div>)
    }
}

function mapStateToProps(state, ownProps){
    const chats = state.chats.entries;
    const load = state.chats.loading;

    let chatsLoad = null;

    if(load){
        chatsLoad = chats;
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
