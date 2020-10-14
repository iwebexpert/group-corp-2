import React, {Component} from "react";
import {connect} from 'react-redux';
import {push} from 'connected-react-router'
import Lottie from "react-lottie";
import error from "../assets/lottie/error-404.json"
import loading from "../assets/lottie/loading.json"

import {addDialogAction, deleteDialog, addFriendListDialog, chatsLoadAction} from "../actions/chats";
import {ChatArea} from "../components/areas/ChatArea";

class ChatAreaContainerClass extends Component{

    componentDidMount() {
        this.props.chatsLoadAction();
    }

    onAddDialog = (newChats) => {
        this.props.addDialogAction({...newChats});
        this.props.redirect(newChats.id);
    }

    onDeleteDialog = (dialogs) => {
        this.props.redirect('new');
        this.props.deleteDialog(dialogs);
    }

    render(){
        const {id, newMsg, isLoading, isError} = this.props;

        const errorLottieOptions = {
            loop: true,
            autoplay: true,
            animationData: error,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };
        const loadingLottieOptions = {
            loop: true,
            autoplay: true,
            animationData: loading,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };

        if(isError){
            return (
                <Lottie options={errorLottieOptions}
                        height={500}
                        width={500}
                />
            );
        }

        if(isLoading){
            return (
                <Lottie options={loadingLottieOptions}
                        height={500}
                        width={500}
                />
            );
        }

        return <ChatArea isLoading={isLoading} id={id} newMsg={newMsg} addDialog={this.onAddDialog} deleteDialog={this.onDeleteDialog}/>;
    }
}

function mapStateToProps(state, ownProps) {
    const chats = state.chats.entries;
    const {id, newMsg} = ownProps;
    return {
        chats,
        id,
        newMsg,
        isLoading: state.chats.loading,
        isError: state.chats.error,
    };
}

function mapDispatchToProps(dispatch){
    return {
        addDialogAction: (newChats) => dispatch(addDialogAction(newChats)),
        deleteDialog: (dialogs) => dispatch(deleteDialog(dialogs)),
        redirect: (chatId) => dispatch(push('/chats/' + chatId)),
        chatsLoadAction: () => dispatch(chatsLoadAction()),
    }
}

export const ChatAreaContainer = connect(mapStateToProps, mapDispatchToProps)(ChatAreaContainerClass);














