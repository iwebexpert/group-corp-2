import React, {useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import classNames from "classnames";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import {setForwardMessage, setSelectedChat} from "../../../redux/actions";
import Divider from "@material-ui/core/Divider";
import ChatRemoveDialog from "./ChatRemoveDialog";
import {push} from 'connected-react-router';
import Badge from "@material-ui/core/Badge";
import MailIcon from '@material-ui/icons/Mail';
import {messageTypes} from "../../../configs/statuses";


export default function ({chat}) {
    const [isDeleteCandidate, setIsDeleteCandidate] = useState(false);
    const { selectedChat} = useSelector(s => s.app);
    const {forwardMessage} = useSelector(s => s.system);
    const dispatch = useDispatch();
    const chatClass = classNames('chatSelector', {chatSelectorSelected: selectedChat === chat._id, chatUnread: chat.unReadCount});
    const selectChat = useCallback(() => {
        dispatch(setSelectedChat(chat._id));
        if (forwardMessage && !forwardMessage.chat){
            dispatch(setForwardMessage({...forwardMessage, chat}));
        }
        dispatch(push(`/messenger/chats/${chat._id}`));
    }, [chat, forwardMessage]);
    return (
        <>
            <ListItem className={chatClass} alignItems="flex-start">
                {
                    !forwardMessage ?
                    <img onClick={() => setIsDeleteCandidate(true)} className={'DeleteChatBtnSelector'} src="https://img.icons8.com/color/48/000000/delete-sign.png"/>
                    : null
                }
                <ChatRemoveDialog isDeleteCandidate={isDeleteCandidate} chat={chat} setIsDeleteCandidate={setIsDeleteCandidate}/>
                <Grid onClick={selectChat} spacing={3} container alignItems='center' justify='space-between'>
                    <Grid item container xs={3} justify={'space-around'} direction={'column'} alignItems={'center'}>
                        <div className={'avatar'}>
                            {chat.lastMessage ? chat.lastMessage.authorName.slice(0,2) : '?'}
                        </div>
                        <span className={'primaryText primaryTextEllipsis'}>{chat.lastMessage ? chat.lastMessage.authorName : ''}</span>
                        <Badge badgeContent={chat.unReadCount} color="primary">
                            <MailIcon />
                        </Badge>
                    </Grid>
                    <Grid container item p={3} xs={9} justify={'space-between'} direction={'column'} alignItems={'center'}>
                        <div className={'chatSelectorTitle'}>
                            {'Чат: ' + chat.title}
                        </div>
                        <div className={'chatSelectorMessage'}>
                            {   chat.lastMessage
                                ?  chat.lastMessage.forwardMessages.length || chat.lastMessage.type === messageTypes.IMAGE || chat.lastMessage.type === messageTypes.AUDIO
                                    ? <div className={'EmptyChatPlaceholder'}>Вложение</div>
                                    : chat.lastMessage.text.length>30
                                        ? chat.lastMessage.text.slice(0,30) + '...' : chat.lastMessage.text
                                        : <div className={'EmptyChatPlaceholder'}>Нет сообщений</div>
                            }
                        </div>
                    </Grid>
                </Grid>
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    );
}
