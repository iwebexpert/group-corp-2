import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getLastMsg} from "./getLastMsg";
import classNames from "classnames";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import {setSelectedChat} from "../../../redux/actions";
import Divider from "@material-ui/core/Divider";
import ChatRemoveDialog from "./ChatRemoveDialog";

export default function ({chat}) {
    const [message, setMessage] = useState(null);
    const [isDeleteCandidate, setIsDeleteCandidate] = useState(false);
    const {curUser, selectedChat} = useSelector(s => s.app);
    const dispatch = useDispatch();
    useEffect(() => {
        async function f() {
            const msg = await getLastMsg(chat._id, curUser);
            setMessage(msg);
        }
        f();
    }, [curUser, selectedChat]);
    const chatClass = classNames('chatSelector', {chatSelectorSelected: selectedChat && selectedChat.sharedId === chat.sharedId});
    return (
        <>
            <ListItem className={chatClass} alignItems="flex-start">
                <img onClick={() => setIsDeleteCandidate(true)} className={'DeleteChatBtnSelector'} src="https://img.icons8.com/color/48/000000/delete-sign.png"/>
                <ChatRemoveDialog isDeleteCandidate={isDeleteCandidate} selectedChat={selectedChat} chat={chat} setIsDeleteCandidate={setIsDeleteCandidate}/>
                <Grid onClick={() => dispatch(setSelectedChat(chat))} spacing={3} container alignItems='center' justify='space-between'>
                    <Grid item container xs={3} justify={'space-around'} direction={'column'} alignItems={'center'}>
                        <div className={'avatar'}>
                            {message ? message.authorName.slice(0,2) : ''}
                        </div>
                        <span className={'primaryText primaryTextEllipsis'}>{message ? message.authorName : ''}</span>
                    </Grid>
                    <Grid container item p={3} xs={9} justify={'space-between'} direction={'column'} alignItems={'center'}>
                        <div className={'chatSelectorTitle'}>
                            {'Чат: ' + chat.title}
                        </div>
                        <div className={'chatSelectorMessage'}>
                            {   message
                                ? (message.text.length>30 ? message.text.slice(0,30) + '...' : message.text)
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
