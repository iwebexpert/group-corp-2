import React, {useCallback, useRef} from "react";
import {DbWorker} from "../../../utils/DbWorker";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import {userTypes} from "./userTypes";
import {useDispatch, useSelector} from "react-redux";
import {setSelectedChat} from "../../../redux/actions";
import {getUserNote} from "../../../utils/helpers";
import {push} from 'connected-react-router';
import {avatarSizeCls} from "../../../configs/statuses";
import {AvatarUser} from "../../common/Avatar";
import {IChat, IUser} from "../../../types/globalTypes";
import {Dispatch} from "redux";
import {IAppState, ICombinedState} from "../../../redux/reduxTypes/rdx";

type propTypes = {
    user: IUser,
    type: userTypes,
    clearInput: () => void;
};
const UserSelector: React.FC<propTypes> = ({user, type, clearInput}) => {
    const startChatRef: React.Ref<HTMLDivElement> = useRef(null);
    const addFriendRef: React.Ref<HTMLDivElement> = useRef(null);
    const removeFriendRef: React.Ref<HTMLDivElement> = useRef(null);
    const dispatch: Dispatch = useDispatch();
    const {chats} = useSelector<ICombinedState, IAppState>(s => s.app);
    const contactsActionHandler: React.MouseEventHandler = useCallback(async (e: React.MouseEvent<HTMLDivElement>): Promise<void> => {
        e.stopPropagation();
        switch ((e.target as HTMLDivElement).dataset.name) {
            case 'startChat': {
                clearInput();
                const existedChat: IChat | undefined = chats.find((x: IChat): boolean => x.members.length === 2 && x.members.includes(user._id));
                if (existedChat) {
                    dispatch(push(`/messenger/chats/${existedChat._id}`));
                    dispatch(setSelectedChat(existedChat._id));
                    clearInput();
                    return;
                }
                const createdChat: IChat | null = await DbWorker.createChat(user);
                if (!createdChat) {
                    break;
                }
                dispatch(push(`/messenger/chats/${createdChat._id}`));
                dispatch(setSelectedChat(createdChat._id));
                clearInput();
                break;
            }
            case 'addFriend': {
                await DbWorker.addFriend(user);
                clearInput();
                break;
            }
            case 'removeFriend': {
                await DbWorker.removeFriend(user);
                clearInput();
                break;
            }
            default:
                throw new Error('Кнопка не найдена');
        }
    }, [user]);

    return (
        <>
            <ListItem id={user._id} className={'chatSelector'}>
                <Grid spacing={1} container alignItems='center' justify='space-between'>
                    <Grid item container xs={4} justify={'space-around'} direction={'column'} alignItems={'center'}>
                        <AvatarUser user={user} classType={avatarSizeCls.Big}/>
                    </Grid>
                    <Grid container item xs={8} justify={'space-between'} direction={'column'} alignItems={'center'}>
                        <div className={'chatSelectorTitle'}>
                            {user.name}
                        </div>
                        <div className={'chatSelectorPeopleBtn'}>
                            <div ref={startChatRef} onClick={contactsActionHandler} data-name={'startChat'}
                                 className={'startChatUserBtn'}/>
                            {
                                type === userTypes.FRIEND || type === userTypes.SUBSCRIPTIONS
                                    ? <div ref={removeFriendRef} onClick={contactsActionHandler}
                                           data-name={'removeFriend'} className={'removeFriendUserBtn'}/>
                                    : null
                            }
                            {
                                type === userTypes.OTHER || type === userTypes.SUBSCRIBERS
                                    ? <div ref={addFriendRef} onClick={contactsActionHandler} data-name={'addFriend'}
                                           className={'addFriendUserBtn'}/>
                                    : null
                            }
                        </div>
                        <div className={'NoteText'}>
                            {getUserNote(type, user)}
                        </div>
                    </Grid>
                </Grid>
            </ListItem>
            <Divider variant="inset" component="li"/>
        </>
    );
};
export default UserSelector;
