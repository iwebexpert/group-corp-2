import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setForwardMessage, setLoading} from "../../../redux/actions";
import {DbWorker} from "../../../utils/DbWorker";

export default ({selectedMessages, setSelectMessagesMode,setSelectedMessages}) => {
    const dispatch = useDispatch();
    const {selectedChat} = useSelector(s => s.app);
    const forwardHandler = useCallback(() => {
        dispatch(setForwardMessage({
            messages: selectedMessages.map(x => ({...x, isForward: true})),
            chat: null
        }));
        setSelectMessagesMode(false);
        setSelectedMessages([]);
    });
    const deleteHandler = useCallback(async () => {
        dispatch(setLoading(true));
        await DbWorker.deleteManyMessages(selectedChat, selectedMessages.map(x => x._id));
        dispatch(setLoading(false));
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
            <div onClick={deleteHandler} className={'button'}>Удалить</div>
            <img onClick={cancelSelectionMode} className={'DeleteSign'} src="https://img.icons8.com/color/48/000000/delete-sign.png"/>
        </div>
    );
}
