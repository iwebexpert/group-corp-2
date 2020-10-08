import React, {useCallback} from "react";
import {useDispatch} from "react-redux";
import {setForwardMessage} from "../../../redux/actions";

export default ({selectedMessages, setSelectMessagesMode,setSelectedMessages}) => {
    const dispatch = useDispatch();
    const forwardHandler = useCallback(() => {
        dispatch(setForwardMessage({
            messages: selectedMessages.map(x => ({...x, isForward: true})),
            chat: null
        }));
        setSelectMessagesMode(false);
        setSelectedMessages([]);
    });
    const cancelSelectionMode = () => {
        setSelectMessagesMode(false);
        setSelectedMessages([]);
        dispatch(setForwardMessage(null));
    };
    return (
        <div className={'ActionsMessagesAreaPanel'}>
            <div onClick={forwardHandler} className={'button'}>Переслать</div>
            <img onClick={cancelSelectionMode} className={'DeleteSign'} src="https://img.icons8.com/color/48/000000/delete-sign.png"/>
        </div>
    );
}
