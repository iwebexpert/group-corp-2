import React, {useCallback, useRef} from "react";
import {activateBtn, disableBtn} from "../../../utils/helpers";
import {DbWorker} from "../../../utils/DbWorker";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import {userTypes} from "./userTypes";
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {setSelectedChat} from "../../../redux/actions";
import {getUserNote} from "../../../utils/helpers";

export default function ({user, type, clearInput}) {
    const startChatRef = useRef();
    const addFriendRef = useRef();
    const removeFriendRef = useRef();
    const dispatch = useDispatch();
    const history = useHistory();
    const {chats} = useSelector(s=> s.app);
    const contactsActionHandler = useCallback(async (e) => {
        e.stopPropagation();
        switch (e.target.dataset.name) {
            case 'startChat':{
                clearInput();
                disableBtn(startChatRef.current);
                const existedChat = chats.find(x => x.members.length ===2 && x.members.includes(user._id));
                if (existedChat){
                    dispatch(setSelectedChat(existedChat._id));
                    history.push(`/messenger/chats/${existedChat._id}`);
                    activateBtn(startChatRef.current);
                    return;
                }
                const createdChat = await DbWorker.createChat(user);
                dispatch(setSelectedChat(createdChat._id));
                history.push(`/messenger/chats/${createdChat._id}`);
                activateBtn(startChatRef.current);
                break;
            }
            case 'addFriend':{
                disableBtn(addFriendRef.current);
                await DbWorker.addFriend(user);
                activateBtn(addFriendRef.current);
                break;
            }
            case 'removeFriend':{
                disableBtn(removeFriendRef.current);
                await DbWorker.removeFriend(user);
                activateBtn(removeFriendRef.current);
                break;
            }
            default: throw new Error('Кнопка не найдена');
        }
    }, [user]);

    return(
        <>
            <ListItem id={user._id} className={'chatSelector'}>
                <Grid spacing={1} container alignItems='center' justify='space-between'>
                    <Grid item container xs={4} justify={'space-around'} direction={'column'} alignItems={'center'}>
                        <div className={'avatarBig'}>
                            {user.avatarUrl ? <img src={user.avatarUrl}/> : user.name.slice(0,2)}
                        </div>
                    </Grid>
                    <Grid container item p={3} xs={8} justify={'space-between'} direction={'column'} alignItems={'center'}>
                        <div className={'chatSelectorTitle'}>
                            {user.name}
                        </div>
                        <div className={'chatSelectorPeopleBtn'}>
                            <div ref={startChatRef} onClick={contactsActionHandler} data-name={'startChat'} className={'startChatUserBtn'}/>
                            {
                                type === userTypes.FRIEND || type === userTypes.SUBSCRIPTIONS
                                    ? <div ref={removeFriendRef} onClick={contactsActionHandler} data-name={'removeFriend'} className={'removeFriendUserBtn'}/>
                                    : null
                            }
                            {
                                type === userTypes.OTHER || type === userTypes.SUBSCRIBERS
                                    ? <div ref={addFriendRef} onClick={contactsActionHandler} data-name={'addFriend'} className={'addFriendUserBtn'}/>
                                    : null
                            }
                        </div>
                        <div className={'NoteText'}>
                            {getUserNote(type, user)}
                        </div>
                    </Grid>
                </Grid>
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    );
}
