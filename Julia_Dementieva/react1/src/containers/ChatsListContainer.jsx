import React from 'react';
import {connect} from 'react-redux';

import {ChatsList} from '../components/ChatsList';
import {mapStateToProps} from '../mapForConnect/mapStateToProps';
import {mapDispatchToProps} from '../mapForConnect/mapDispatchToProps';



class ChatsListContainerClass extends React.Component {
    
    componentDidMount(){
        
        if(this.props.chatsLoad == null){
            this.props.chatsLoadAction();
        }
    }

    chatAddHandler = (newchat) => {
        const {chatsListSendAction, redirect, lastChatId} = this.props;
        chatsListSendAction({
            author: newchat,
            avatar: 'https://cityblank.ru/upload/iblock/cc4/cc47d6df370960cbe120d01e999abfeb.gif',
        });
        redirect(lastChatId);
    };

    chatClickHandler = (chatId) =>{
        const {messageUnfireAction} = this.props;
        if (chatId >= 0){
            messageUnfireAction({chatId});
        }
    }

    render(){
        const {chatsLoad, fireListId, isLoading} = this.props;
        return( <ChatsList chats={chatsLoad} fireChats={fireListId} onAdd={this.chatAddHandler} isLoading={isLoading} onClick={this.chatClickHandler}/>)
    }
}
export const ChatsListContainer = connect(mapStateToProps('ChatsListContainer'), mapDispatchToProps('ChatsListContainer'))(ChatsListContainerClass);