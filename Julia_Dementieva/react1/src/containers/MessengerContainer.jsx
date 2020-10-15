import React from 'react';
import {connect} from 'react-redux';
import { nanoid } from 'nanoid';
import {Messenger} from 'components/Messenger';
import {Error} from '../pages/Error';
import {mapStateToProps} from '../mapForConnect/mapStateToProps';
import {mapDispatchToProps} from '../mapForConnect/mapDispatchToProps';


class MessengerContainerClass extends React.Component {
    
    componentDidMount(){
        if(this.props.chatId ==null){
            this.props.chatsLoadAction();
            this.props.aboutLoadAction();
            this.props.robotLoadAction();
        };
    }

    handleMessageSend = (message) => {
        const {chatId, chatsMessageSendAction} = this.props;
        chatsMessageSendAction({
            ...message,
            id: nanoid(),
            chatId,
        });
    };

    render(){
        const {isLoading} = this.props;
        return(<Messenger {...this.props} isLoading={isLoading} onAdd={this.handleMessageSend} />)
    }
}

export const MessengerContainer = connect(mapStateToProps('MessengerContainer'), mapDispatchToProps('MessengerContainer'))(MessengerContainerClass);