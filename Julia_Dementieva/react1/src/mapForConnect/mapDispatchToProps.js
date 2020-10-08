import {aboutLoadAction} from '../actions/about';
import {chatsLoadAction, chatsListSendAction, chatsMessageSendAction} from '../actions/chats';
import {robotLoadAction} from '../actions/robot';
import {push} from 'connected-react-router';

export const mapDispatchToProps = (component) => {
    switch(component){
        case 'HeaderContainer':
        case 'AboutContainer': 
        {
            return function (dispatch){
                return {
                    aboutLoadAction: () => dispatch(aboutLoadAction()),
                };
            };
        };

        case 'ChatsListContainer': {
            return function (dispatch){
                return {
                    chatsLoadAction: () => dispatch(chatsLoadAction()),
                    chatsListSendAction: (chat) => dispatch(chatsListSendAction(chat)),
                    redirect: (chatId) => dispatch(push(`/chats/${chatId}`)),
                }
            };
        };

        case 'MessengerContainer': {
            return function (dispatch){
                return {
                    chatsLoadAction: () => dispatch(chatsLoadAction()),
                    aboutLoadAction: () => dispatch(aboutLoadAction()),
                    robotLoadAction: () => dispatch(robotLoadAction()),
                    chatsMessageSendAction: (message) => dispatch(chatsMessageSendAction(message)),
                    
                }
            };
        };
            
            

        default:
            return null;
    }
};