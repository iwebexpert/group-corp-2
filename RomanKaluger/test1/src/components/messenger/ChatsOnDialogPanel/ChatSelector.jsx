import React, {useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import classNames from "classnames";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import {openCreateConversation, setForwardMessage, setSelectedChat} from "../../../redux/actions";
import Divider from "@material-ui/core/Divider";
import ChatRemoveDialog from "./ChatRemoveDialog";
import {push} from 'connected-react-router';
import Badge from "@material-ui/core/Badge";
import MailIcon from '@material-ui/icons/Mail';
import {avatarSizeCls, messageTypes} from "../../../configs/statuses";
import {CloseWindow} from "../../common/CloseWindow";
import {AvatarUser} from "../../common/Avatar";


export default function ({chat}) {
    const [isDeleteCandidate, setIsDeleteCandidate] = useState(false);
    const {selectedChat, contacts,curUser} = useSelector(s => s.app);
    const {forwardMessage} = useSelector(s => s.system);
    const dispatch = useDispatch();
    const chatClass = classNames('chatSelector', {
        chatSelectorSelected: selectedChat === chat._id,
        chatUnread: chat.unReadCount
    });
    const selectChat = useCallback(() => {
        dispatch(setSelectedChat(chat._id));
        if (forwardMessage && !forwardMessage.chat) {
            dispatch(setForwardMessage({...forwardMessage, chat}));
        }
        dispatch(push(`/messenger/chats/${chat._id}`));
    }, [chat, forwardMessage]);
    return (
        <>
            <ListItem className={chatClass} alignItems="flex-start">
                {
                    !forwardMessage ?
                        <CloseWindow actionClose={() => setIsDeleteCandidate(true)}/>
                        : null
                }
                <ChatRemoveDialog isDeleteCandidate={isDeleteCandidate} chat={chat}
                                  setIsDeleteCandidate={setIsDeleteCandidate}/>
                <Grid onClick={selectChat} spacing={3} container alignItems='center' justify='space-between'>
                    <Grid item container xs={3} justify={'space-around'} direction={'column'} alignItems={'center'}>
                        <AvatarUser
                            user={chat.lastMessage ? Object.values(contacts).flat().concat([curUser]).find(x => x && x._id === chat.lastMessage.author) : null}
                            classType={avatarSizeCls.Normal}
                            needFind={chat.lastMessage ? chat.lastMessage.author: null}
                        />
                        <span
                            className={'primaryText primaryTextEllipsis'}>{chat.lastMessage ? chat.lastMessage.authorName : ''}</span>
                        <Badge badgeContent={chat.unReadCount} color="primary">
                            <MailIcon/>
                        </Badge>
                    </Grid>
                    <Grid container item p={3} xs={9} justify={'space-between'} direction={'column'}
                          alignItems={'center'}>
                        <div className={'chatSelectorTitle'}>
                            {'Чат: ' + chat.title}
                        </div>
                        <div className={'chatSelectorMessage'}>
                            {chat.lastMessage
                                ? chat.lastMessage.forwardMessages.length || chat.lastMessage.type === messageTypes.IMAGE || chat.lastMessage.type === messageTypes.AUDIO
                                    ? <div className={'EmptyChatPlaceholder'}>Вложение</div>
                                    : chat.lastMessage.text.length > 30
                                        ? <div className={classNames({lastMessagePreview: !chat.lastMessage.isRead})}>{chat.lastMessage.text.slice(0, 30) + '...'}</div>
                                        : <div className={classNames({lastMessagePreview: !chat.lastMessage.isRead})}>{chat.lastMessage.text}</div>
                                : <div className={'EmptyChatPlaceholder'}>Нет сообщений</div>
                            }
                        </div>
                    </Grid>
                </Grid>
            </ListItem>
            <Divider variant="inset" component="li"/>
        </>
    );
}
