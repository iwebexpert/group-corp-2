import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {checkMessagesForSelectorInfo} from "./checkMessagesForSelectorInfo";
import classNames from "classnames";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import {setForwardMessage, setSelectedChat} from "../../../redux/actions";
import Divider from "@material-ui/core/Divider";
import ChatRemoveDialog from "./ChatRemoveDialog";
import { useHistory } from 'react-router-dom';
import Badge from "@material-ui/core/Badge";
import MailIcon from '@material-ui/icons/Mail';


export default function ({chat}) {
    const [message, setMessage] = useState(null);
    const [unReadCount, setUnReadCount] = useState(0);
    const [isDeleteCandidate, setIsDeleteCandidate] = useState(false);
    const {curUser, selectedChat} = useSelector(s => s.app);
    const {forwardMessage} = useSelector(s => s.system);
    const dispatch = useDispatch();
    useEffect(() => {
        checkMessagesForSelectorInfo(chat._id, setMessage,setUnReadCount,curUser);
    }, [chat]);
    const chatClass = classNames('chatSelector', {chatSelectorSelected: selectedChat === chat._id});
    const history = useHistory();
    const selectChat = useCallback(() => {
        dispatch(setSelectedChat(chat._id));
        if (forwardMessage && !forwardMessage.chat){
            dispatch(setForwardMessage({...forwardMessage, chat}));
        }
        history.push(`/messenger/chats/${chat._id}`);
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
                            {message ? message.authorName.slice(0,2) : ''}
                        </div>
                        <span className={'primaryText primaryTextEllipsis'}>{message ? message.authorName : ''}</span>
                        <Badge badgeContent={unReadCount} color="primary">
                            <MailIcon />
                        </Badge>
                    </Grid>
                    <Grid container item p={3} xs={9} justify={'space-between'} direction={'column'} alignItems={'center'}>
                        <div className={'chatSelectorTitle'}>
                            {'Чат: ' + chat.title}
                        </div>
                        <div className={'chatSelectorMessage'}>
                            {   message
                                ?  message.forwardMessages
                                    ? <div className={'EmptyChatPlaceholder'}>Вложение</div>
                                    : message.text.length>30
                                        ? message.text.slice(0,30) + '...' : message.text
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
