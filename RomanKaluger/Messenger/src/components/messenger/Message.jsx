import React, {useCallback, useRef, useState} from "react";
import {useSelector} from "react-redux";
import classNames from 'classnames';
import Popover from "@material-ui/core/Popover";
import {DbWorker} from "../../utils/DbWorker";


export default ({message, chat}) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const curUser = useSelector(s => s.app.curUser) || {_id: null};
    const messageClass = classNames('Message', {MyMessage: curUser._id === message.author});
    const authorClass = classNames('avatar', {MyIconAuthor: curUser._id === message.author});
    const msgClick = () => setIsPopoverOpen(true);
    const closePopover = () => setIsPopoverOpen(false);
    const deleteHandler = useCallback(() => {
        closePopover();
        DbWorker.deleteMessage(chat._id,message._id);
    },[]);
    const msgRef= useRef();
    return (
        <>
            <div ref={msgRef} className={messageClass} onClick={msgClick}>
                <div className={authorClass}>{message.authorName.slice(0, 2)}</div>
                <div className={'MessageText'}>{message.text}</div>
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
                </div>
            </Popover>
        </>
    );
}
