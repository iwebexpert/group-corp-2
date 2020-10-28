import React, {useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {push} from 'connected-react-router'
import Lottie from "react-lottie";
import error from "../assets/lottie/error-404.json"
import loading from "../assets/lottie/loading.json"

import {addDialogAction, deleteDialog, addFriendListDialog, chatsLoadAction} from "../actions/chats";
import {ChatArea} from "../components/areas/ChatArea";

export const ChatAreaContainer = ({id, newMsg}) => {

    const dispatch = useDispatch();
    const chats = useSelector((state) => state.chats.entries);
    const [isLoading, isError] = useSelector((state) => [state.chats.loading, state.chats.error]);

    useEffect(() => {
        dispatch(chatsLoadAction());
    }, []);

    const redirect = (chatId) => {
        dispatch(push('/chats/' + chatId));
    }

    const onAddDialog = (newChats) => {
        dispatch(addDialogAction({...newChats}));
        redirect(newChats.id);
    }

    const onDeleteDialog = (dialogs) => {
        redirect('new');
        dispatch(deleteDialog(dialogs));
    }

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

    if (isError) {
        return (
            <Lottie options={errorLottieOptions}
                    height={500}
                    width={500}
            />
        );
    }

    if (isLoading) {
        return (
            <Lottie options={loadingLottieOptions}
                    height={500}
                    width={500}
            />
        );
    }

    return <ChatArea isLoading={isLoading} id={id} newMsg={newMsg} addDialog={onAddDialog}
                     deleteDialog={onDeleteDialog}/>;

}

// function mapStateToProps(state, ownProps) {
//     const chats = state.chats.entries;
//     const {id, newMsg} = ownProps;
//     return {
//         chats,
//         id,
//         newMsg,
//         isLoading: state.chats.loading,
//         isError: state.chats.error,
//     };
// }
//
// function mapDispatchToProps(dispatch){
//     return {
//         addDialogAction: (newChats) => dispatch(addDialogAction(newChats)),
//         deleteDialog: (dialogs) => dispatch(deleteDialog(dialogs)),
//         redirect: (chatId) => dispatch(push('/chats/' + chatId)),
//         chatsLoadAction: () => dispatch(chatsLoadAction()),
//     }
// }
//
// export const ChatAreaContainer = connect(mapStateToProps, mapDispatchToProps)(ChatAreaContainerClass);














