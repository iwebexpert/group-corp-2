import React, {useCallback, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import classNames from 'classnames';
import Popover from "@material-ui/core/Popover";
import CircularProgress from "@material-ui/core/CircularProgress";
import ReactAudioPlayer from "react-audio-player";
import {avatarSizeCls, messageTypes} from "../../../configs/statuses";
import {openUserProfile, setCommonViewImages} from "../../../redux/actions";
import {AvatarUser} from "../../common/Avatar";



const Message = ({message,selectMessagesMode, selectedMessages = [],setSelectMessagesMode = false, setSelectedMessages}) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const dispatch = useDispatch();
    const {curUser, contacts} = useSelector(s => s.app);
    const author = curUser && message.author === curUser._id ? curUser : Object.values(contacts).flat().concat([curUser]).find(x => x && x._id === message.author);
    const messageClass = classNames('Message', {
            MyMessage: curUser && curUser._id === message.author && !message.isForward,
            ForwardMessage: message.isForward,
        });
    const messageContainerClass = classNames('messageContainer', {
            messageContainerSelected: selectedMessages.find(x => x._id === message._id),
            messageContainerUnread: !message.isRead
        });
    const msgContainerClick = (e) => {
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
    const msgClick = (e) => {
        if (!message.isForward && !selectMessagesMode && !e.target.classList.contains('messageImage')){
            setIsPopoverOpen(true);
        }
    };
    const closePopover = () => setIsPopoverOpen(false);
    const deleteHandler = useCallback(() => {
        setSelectMessagesMode(true);
        closePopover();
        setSelectedMessages([message]);
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
                {   !message.isForward &&  curUser && curUser._id === message.author
                        ? message.isPending
                            ? <CircularProgress />
                            : message.isRead
                                ? <img alt={'StatusSign'} className={'StatusSign'} src="https://img.icons8.com/color/48/000000/double-tick.png"/>
                                : <img alt={'StatusSign'} className={'StatusSign'} src="https://img.icons8.com/color/48/000000/checkmark.png"/>
                                        :null
                }
                <AvatarUser user={author} classType={avatarSizeCls.normal} needFind={author ? author : message.author}/>
                <div className={'MessageText'}>{message.text}</div>
                {
                    message.type === messageTypes.AUDIO
                        ? <ReactAudioPlayer
                            src={message.content}
                            controls
                        /> :null
                }
                {
                    message.type === messageTypes.IMAGE
                        ? message.content.map((img, i) =>
                            <div key={i} className={'messageImageWrapper'}
                                 onClick={(e) => {e.stopPropagation(); dispatch(setCommonViewImages(message.content));}}>
                                <img alt={'messageImage'} className={'messageImage'} src={img}/>
                            </div>) :null
                }
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
                    <img onClick={deleteHandler} alt={'PanelMessageActionsButton'}  className={'PanelMessageActionsButton'} src="https://img.icons8.com/color/48/000000/delete.png"/>
                    <img onClick={forwardMsgBtnHandler} alt={'PanelMessageActionsButton'} className={'PanelMessageActionsButton'} src="https://img.icons8.com/color/100/000000/forward-message.png"/>
                </div>
            </Popover>
        </div>
    );
};
export default Message;
