import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import classNames from 'classnames';
import Popover from "@material-ui/core/Popover";
import {DbWorker} from "../../../utils/DbWorker";
import CircularProgress from "@material-ui/core/CircularProgress";



const Message = ({message, chat,selectMessagesMode, selectedMessages = [],setSelectMessagesMode = false, setSelectedMessages}) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const curUser = useSelector(s => s.app.curUser) || {_id: null};
    const messageClass = classNames('Message', {
            MyMessage: curUser._id === message.author && !message.isForward,
            ForwardMessage: message.isForward,
        });
    const authorClass = classNames('avatar', {MyIconAuthor: curUser._id === message.author});
    const messageContainerClass = classNames('messageContainer', {
            messageContainerSelected: selectedMessages.find(x => x._id === message._id),
            messageContainerUnread: message.isRead === false
        });
    const msgContainerClick = () => {
        if (selectMessagesMode){
            setSelectedMessages(prev=>{
               const isSelected = prev.find(x => x._id === message._id);
               if (isSelected){
                   return prev.filter(x => x!==isSelected);
               }
               return [...prev, {...message}];
            });
        }
    };
    const msgClick = () => {
        if (!message.isForward && !selectMessagesMode){
            setIsPopoverOpen(true);
        }
    };
    const closePopover = () => setIsPopoverOpen(false);
    const deleteHandler = useCallback(() => {
        closePopover();
        DbWorker.deleteMessage(chat._id,message._id);
    },[]);
    const forwardMsgBtnHandler = () =>{
        setSelectMessagesMode(true);
        closePopover();
        setSelectedMessages([message]);
    };
    const msgRef= useRef();
    return (
        <div onClick={msgContainerClick} className={messageContainerClass}>
            <div ref={msgRef} className={messageClass} onClick={msgClick}>
                {   !message.isForward &&  curUser._id === message.author
                        ? message.isPending
                            ? <CircularProgress />
                            : message.isRead
                                ? <img className={'StatusSign'} src="https://img.icons8.com/color/48/000000/double-tick.png"/>
                                : <img className={'StatusSign'} src="https://img.icons8.com/color/48/000000/checkmark.png"/>
                                        :null
                }
                <div className={authorClass}>{message.authorName.slice(0, 2)}</div>
                <div className={'MessageText'}>{message.text}</div>
                {
                    message.forwardMessages ? message.forwardMessages.map(msg =>
                        <Message key={msg._id} message={msg} />
                    ) : null
                }
            </div>
            <Popover
                open={isPopoverOpen}
                anchorEl={isPopoverOpen ? msgRef.current : null}
                onClose={closePopover}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <div className={'PanelMessageActions'}>
                    <img onClick={deleteHandler} className={'PanelMessageActionsButton'} src="https://img.icons8.com/color/48/000000/delete.png"/>
                    <img onClick={forwardMsgBtnHandler} className={'PanelMessageActionsButton'} src="https://img.icons8.com/color/100/000000/forward-message.png"/>
                </div>
            </Popover>
        </div>
    );
};
export default Message;
