import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setSelectedChat} from "../../redux/actions";
import {DbWorker} from "../../utils/DbWorker";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import classNames from 'classnames';
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";

async function getLastMsg(chatId) {
    const messages = await DbWorker.getMessages(chatId);
    if (!messages.length) {
        return null;
    }
    return messages[messages.length - 1];
}

function ChatSelector({chat}) {
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
    const cancelDelete = () => setIsDeleteCandidate(false);
    const acceptDelete = useCallback(() => {
        DbWorker.deleteChat(chat._id);
        setIsDeleteCandidate(false);
    },[selectedChat, chat]);
    return (
        <>
        <ListItem className={chatClass} alignItems="flex-start">
            <img onClick={() => setIsDeleteCandidate(true)} className={'DeleteChatBtnSelector'} src="https://img.icons8.com/color/48/000000/delete-sign.png"/>
            {
                <Dialog
                    open={isDeleteCandidate}
                    onClose={cancelDelete}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Внимание"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {`Вы уверены, что хотите удалить чат ${chat.title}?`}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={cancelDelete} color="primary">
                            Отмена
                        </Button>
                        <Button onClick={acceptDelete} color="primary" autoFocus>
                            Удалить
                        </Button>
                    </DialogActions>
                </Dialog>
            }
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

export default ({chats}) => {
    return (
        <div className={'ChatsSectionDlgPn'}>
            <List>
{
    chats.length ? chats.map(ch => <ChatSelector key={ch._id} chat={ch}/>) : 'Чатов нет'
}
            </List>
        </div>
    );
};
