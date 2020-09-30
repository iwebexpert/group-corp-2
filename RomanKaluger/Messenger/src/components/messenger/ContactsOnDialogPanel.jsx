import React, { useCallback, useRef} from "react";
import { useSelector } from "react-redux";
import {activateBtn, disableBtn} from "../../utils/helpers";
import {DbWorker} from "../../utils/DbWorker";
import ListItem from "@material-ui/core/ListItem";
import {setSelectedChat} from "../../redux/actions";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";

const userTypes = {
    FRIEND: 'FRIEND',
    OTHER: 'OTHER'
};
function UserSelector({user, type, clearInput}) {
    const startChatRef = useRef();
    const startChatHandler = useCallback(async () => {
        clearInput();
        disableBtn(startChatRef.current);
        await DbWorker.createChat(user);
        activateBtn(startChatRef.current);
    }, [user]);
    return(
        <>
            <ListItem className={'chatSelector'}>
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
                            <div ref={startChatRef} onClick={startChatHandler} className={'startChatUserBtn'}/>
                            {
                                type === userTypes.OTHER
                                    ? <div className={'addFriendUserBtn'}/>
                                    : null
                            }
                        </div>
                    </Grid>
                </Grid>
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    );
}
export default ({users, clearInput}) => {
    const user = useSelector(s => s.app.curUser);
    const friends = [];
    const others = [];
    users.forEach(u => {
        if (user.friends.includes(u._id)){
            friends.push(u);
        } else {
            others.push(u);
        }
    });
    return(
        <>
            <div className={'ChatsSectionDlgPn'}>
                <div className={'ChatsSectionHeaderDlgPn'}>
                    Друзья
                </div>
                {
                    friends.length ? <List>{users.map(u => <UserSelector key={u._id} type={userTypes.FRIEND} user={u}/>)}</List> : 'Друзей нет'
                }

            </div>
            {
                others.length ?
                    <div className={'ChatsSectionDlgPn'}>
                        <div className={'ChatsSectionHeaderDlgPn'}>
                            Поиск
                        </div>
                        <List>
                        {others.map(u => <UserSelector clearInput={clearInput} key={u._id}  type={userTypes.OTHER} user={u}/>)}
                        </List>
                    </div>
                    : null
            }
        </>
    );
};
