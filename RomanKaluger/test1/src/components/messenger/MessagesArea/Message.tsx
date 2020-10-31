import React, {MouseEventHandler, useCallback, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import classNames from 'classnames';
import Popover from "@material-ui/core/Popover";
import CircularProgress from "@material-ui/core/CircularProgress";
import ReactAudioPlayer from "react-audio-player";
import {avatarSizeCls, messageTypes} from "../../../configs/statuses";
import {setCommonViewImages} from "../../../redux/actions";
import {AvatarUser} from "../../common/Avatar";
import {IMessage, IUser} from "../../../types/globalTypes";
import {Dispatch} from "redux";
import {IAppState, ICombinedState} from "../../../redux/reduxTypes/rdx";

type propTypes = {
    message: IMessage,
    selectMessagesMode?: boolean,
    selectedMessages?: IMessage[],
    setSelectMessagesMode?: React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedMessages?: React.Dispatch<React.SetStateAction<IMessage[]>>
};
const Message: React.FC<propTypes> = ({message, selectMessagesMode = false, selectedMessages = [], setSelectMessagesMode, setSelectedMessages}) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
    const dispatch: Dispatch = useDispatch();
    const {curUser, contacts} = useSelector<ICombinedState, IAppState>(s => s.app);
    const author: IUser = curUser && message.author === curUser._id ? curUser : Object.values(contacts).flat().concat([curUser]).find((x: IUser): boolean => x && x._id === message.author);
    const messageClass: string = classNames('Message', {
        MyMessage: curUser && curUser._id === message.author && !message.isForward,
        ForwardMessage: message.isForward,
    });
    const messageContainerClass: string = classNames('messageContainer', {
        messageContainerSelected: selectedMessages.find(x => x._id === message._id),
        messageContainerUnread: !message.isRead
    });
    const msgContainerClick: MouseEventHandler = (): void => {
        if (selectMessagesMode && setSelectedMessages) {
            setSelectedMessages((prev: IMessage[]): IMessage[] => {
                const isSelected: IMessage | undefined = prev.find((x: IMessage): boolean => x._id === message._id);
                if (isSelected) {
                    return prev.filter((x: IMessage): boolean => x !== isSelected);
                }
                return [...prev, {...message}];
            });
        }
    };
    const msgClick: MouseEventHandler = (e: React.MouseEvent<HTMLDivElement>): void => {
        if (!message.isForward && !selectMessagesMode && !(e.target as HTMLDivElement).classList.contains('messageImage')) {
            setIsPopoverOpen(true);
        }
    };
    const closePopover = (): void => setIsPopoverOpen(false);
    const deleteHandler: MouseEventHandler = useCallback((): void => {
        if (!setSelectMessagesMode || !setSelectedMessages) {
            return;
        }
        setSelectMessagesMode(true);
        closePopover();
        setSelectedMessages([message]);
    }, [message]);
    const forwardMsgBtnHandler = (): void => {
        if (!setSelectMessagesMode || !setSelectedMessages) {
            return;
        }
        setSelectMessagesMode(true);
        closePopover();
        setSelectedMessages([message]);
    };
    const msgRef: React.Ref<HTMLDivElement> = useRef(null);
    return (
        <div onClick={msgContainerClick} className={messageContainerClass}>
            <div ref={msgRef} className={messageClass} onClick={msgClick}>
                {!message.isForward && curUser && curUser._id === message.author
                    ? message.isPending
                        ? <CircularProgress/>
                        : message.isRead
                            ? <img alt={'StatusSign'} className={'StatusSign'}
                                   src="https://img.icons8.com/color/48/000000/double-tick.png"/>
                            : <img alt={'StatusSign'} className={'StatusSign'}
                                   src="https://img.icons8.com/color/48/000000/checkmark.png"/>
                    : null
                }
                <AvatarUser user={author} classType={avatarSizeCls.Normal}
                            needFind={author ? author._id : message.author}/>
                <div className={'MessageText'}>{message.text}</div>
                {
                    message.type === messageTypes.AUDIO
                        ? <ReactAudioPlayer
                            src={message.content && !Array.isArray(message.content) ? message.content : undefined}
                            controls
                        /> : null
                }
                {
                    message.type === messageTypes.IMAGE && Array.isArray(message.content)
                        ? message.content.map((img: string, i: number): React.ReactNode =>
                            <div key={i} className={'messageImageWrapper'}
                                 onClick={(e: React.MouseEvent<HTMLDivElement>): void => {
                                     e.stopPropagation();
                                     dispatch(setCommonViewImages(message.content as string[]));
                                 }}>
                                <img alt={'messageImage'} className={'messageImage'} src={img}/>
                            </div>) : null
                }
                {
                    message.forwardMessages ? message.forwardMessages.map((msg: IMessage): React.ReactNode =>
                        <Message key={msg._id} message={msg}/>
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
                    <img onClick={deleteHandler} alt={'PanelMessageActionsButton'}
                         className={'PanelMessageActionsButton'}
                         src="https://img.icons8.com/color/48/000000/delete.png"/>
                    <img onClick={forwardMsgBtnHandler} alt={'PanelMessageActionsButton'}
                         className={'PanelMessageActionsButton'}
                         src="https://img.icons8.com/color/100/000000/forward-message.png"/>
                </div>
            </Popover>
        </div>
    );
};
export default Message;
