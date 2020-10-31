import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setForwardMessage, setLoading} from "../../../redux/actions";
import {DbWorker} from "../../../utils/DbWorker";
import {IMessage} from "../../../types/globalTypes";
import {Dispatch} from "redux";
import {IAppState, ICombinedState} from "../../../redux/reduxTypes/rdx";

type propTypes = {
    selectedMessages: IMessage[],
    setSelectMessagesMode: React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedMessages: React.Dispatch<React.SetStateAction<IMessage[]>>
};
const ActionPanel: React.FC<propTypes> = ({selectedMessages, setSelectMessagesMode, setSelectedMessages}) => {
    const dispatch: Dispatch = useDispatch();
    const {selectedChat} = useSelector<ICombinedState, IAppState>(s => s.app);
    const forwardHandler: React.MouseEventHandler = useCallback((): void => {
        dispatch(setForwardMessage({
            messages: selectedMessages.map((x: IMessage): IMessage => ({...x, isForward: true})),
            chat: null
        }));
        setSelectMessagesMode(false);
        setSelectedMessages([]);
    }, [selectedMessages]);
    const deleteHandler: React.MouseEventHandler = useCallback(async (): Promise<void> => {
        if (!selectedChat) {
            return;
        }
        dispatch(setLoading(true));
        await DbWorker.deleteManyMessages(selectedChat, selectedMessages.map((x: IMessage): string => x._id));
        dispatch(setLoading(false));
        setSelectMessagesMode(false);
        setSelectedMessages([]);
    }, [selectedChat, selectedMessages]);
    const cancelSelectionMode = (): void => {
        setSelectMessagesMode(false);
        setSelectedMessages([]);
        dispatch(setForwardMessage(null));
    };
    return (
        <div className={'ActionsMessagesAreaPanel'}>
            <div onClick={forwardHandler} className={'button'}>Переслать</div>
            <div onClick={deleteHandler} className={'button'}>Удалить</div>
            <img onClick={cancelSelectionMode} className={'DeleteSign'}
                 src="https://img.icons8.com/color/48/000000/delete-sign.png"/>
        </div>
    );
};
export default ActionPanel;
