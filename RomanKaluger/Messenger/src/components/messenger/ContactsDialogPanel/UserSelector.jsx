import React, {useCallback, useRef} from "react";
import {activateBtn, disableBtn} from "../../../utils/helpers";
import {DbWorker} from "../../../utils/DbWorker";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import {userTypes} from "./userTypes";

function getNote(type, user) {
    let str = user.name;
    switch (type) {
        case userTypes.FRIEND: str += ' у вас в друзьях'; break;
        case userTypes.SUBSCRIBERS: str += ' у вас в подписчиках'; break;
        case userTypes.SUBSCRIPTIONS: str += ' у вас в подписках'; break;
        default: str = '';
    }
    return str;
}

export default function ({user, type, clearInput}) {
    const startChatRef = useRef();
    const addFriendRef = useRef();
    const removeFriendRef = useRef();

    const contactsActionHandler = useCallback(async (e) => {
        e.stopPropagation();
        disableBtn(startChatRef.current);
        switch (e.target.dataset.name) {
            case 'startChat':{
                clearInput();
                await DbWorker.createChat(user);
                break;
            }
            case 'addFriend':{
                await DbWorker.addFriend(user);
                break;
            }
            case 'removeFriend':{
                await DbWorker.removeFriend(user);
                break;
            }
            default: throw new Error('Кнопка не найдена');
        }
        activateBtn(startChatRef.current);
    }, [user]);

    return(
        <>
            <ListItem id={user._id} className={'chatSelector'}>
                <Grid spacing={1} container alignItems='center' justify='space-between'>
                    <Grid item container xs={4} justify={'space-around'} direction={'column'} alignItems={'center'}>
                        <div className={'avatarBig'}>
                            {user.name.slice(0,2)}
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
                            {getNote(type, user)}
                        </div>
                    </Grid>
                </Grid>
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    );
}
