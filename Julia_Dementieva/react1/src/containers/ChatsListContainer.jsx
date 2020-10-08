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
        console.log('chatlist',this.props.infoPerson);
    }

    chatAddHandler = (newchat) => {
        const {chatsListSendAction, redirect, lastChatId} = this.props;
        chatsListSendAction({
            author: newchat,
            avatar: 'https://cityblank.ru/upload/iblock/cc4/cc47d6df370960cbe120d01e999abfeb.gif',
        });
        redirect(lastChatId);
    };

    render(){
        const {chatsLoad} = this.props;
        return(chatsLoad ? <ChatsList chats={chatsLoad} onAdd={this.chatAddHandler}  /> : <div>Данные не получены</div>)
    }
}
export const ChatsListContainer = connect(mapStateToProps('ChatsListContainer'), mapDispatchToProps('ChatsListContainer'))(ChatsListContainerClass);
// function mapStateToProps(state, ownProps){
//     const {entries, loading} = state.chats;

//     let chatsLoad = null;

//     if(loading){
//         chatsLoad = entries;
//     }
 
//     return {
//         chatsLoad,
//     };
// }

// function mapDispatchToProps(dispatch){
//     return {
//         chatsLoadAction: () => dispatch(chatsLoadAction()),
//         chatsListSendAction: (chat) => dispatch(chatsListSendAction(chat)),
//     }
// }


