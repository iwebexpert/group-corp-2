import React, {useCallback, useRef} from "react";
import {activateBtn, disableBtn} from "../../../utils/helpers";
import {DbWorker} from "../../../utils/DbWorker";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import {userTypes} from "./userTypes";

export default function ({user, type, clearInput}) {
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
