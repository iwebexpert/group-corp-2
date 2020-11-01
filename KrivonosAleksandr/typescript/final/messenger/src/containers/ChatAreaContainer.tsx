import React, {useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';
import Lottie from "react-lottie";
import error from "../assets/lottie/error-404.json"
import loading from "../assets/lottie/loading.json"

import {addDialogAction, chatsLoadAction} from "../actions/chats";
import {ChatArea} from "../components/areas/ChatArea";
import {AppState} from "../reducers";

export const ChatAreaContainer: React.FC<any> = ({id, newMsg}) => {

    const dispatch = useDispatch();
    const [isLoading, isError] = useSelector((state: AppState) => [state.chats.loading, state.chats.error]);

    useEffect(() => {
        dispatch(chatsLoadAction());
    }, []);

    const onAddDialog = (newChats: chatsPayload): void => {
        dispatch(addDialogAction({...newChats}));
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
