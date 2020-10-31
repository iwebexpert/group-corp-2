import React, {useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {push} from 'connected-react-router'
import Lottie from "react-lottie";
import error from "../assets/lottie/error-404.json"
import loading from "../assets/lottie/loading.json"

import {addDialogAction, deleteDialog, chatsLoadAction} from "../actions/chats";
import {ChatArea} from "../components/areas/ChatArea";
import {AppState} from "../reducers";

export const ChatAreaContainer: React.FC<any> = ({id, newMsg}) => {

    const dispatch = useDispatch();
    const chats = useSelector((state: AppState) => state.chats.entries);
    const [isLoading, isError] = useSelector((state: AppState) => [state.chats.loading, state.chats.error]);

    useEffect(() => {
        dispatch(chatsLoadAction());
    }, []);

    const redirect = (chatId: string): void => {
        dispatch(push('/chats/' + chatId));
    }

    const onAddDialog = (newChats: chatsPayload): void => {
        dispatch(addDialogAction({...newChats}));
        redirect(newChats.id);
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

    return <ChatArea id={id} newMsg={newMsg} addDialog={onAddDialog}
    />;

}
