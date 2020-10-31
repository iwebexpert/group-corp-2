import React from "react";
import {useDispatch, useSelector} from "react-redux";
import UserSelector from "./UserSelector";
import List from "@material-ui/core/List";
import {userTypes} from "./userTypes";
import {openUserProfile} from "../../../redux/actions";
import {categorizeUser} from "../../../utils/helpers";
import {IAppState, ICombinedState} from "../../../redux/reduxTypes/rdx";
import {IUser} from "../../../types/globalTypes";
import {Dispatch} from "redux";

type propTypes = {
    clearInput: () => void
};
const ContactsOnDialogPanel: React.FC<propTypes> = ({clearInput}) => {
    const {curUser, contacts} = useSelector<ICombinedState, IAppState>(s => s.app);
    const {friends, subscribers, subscriptions, others}: { friends: IUser[], subscribers: IUser[], subscriptions: IUser[], others: IUser[] } = contacts;
    const dispatch: Dispatch = useDispatch();
    const openUserInfo: React.MouseEventHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        const el: HTMLDivElement | null = (e.target as HTMLDivElement).closest('.chatSelector');
        if (!el) {
            return;
        }
        const id: string = el.id;
        if (!id) {
            return;
        }
        const usr: IUser | undefined = [].concat(...Object.values(contacts)).find((x: IUser): boolean => x._id === id);
        if (usr) {
            dispatch(openUserProfile(usr));
        }
    };
    return (
        <>
            {
                others.length ?
                    <div onClick={openUserInfo} className={'ChatsSectionDlgPn'}>
                        <div className={'ChatsSectionHeaderDlgPn'}>
                            Поиск
                        </div>
                        <List>
                            {others.map((u: IUser): React.ReactNode => <UserSelector clearInput={clearInput} key={u._id}
                                                                                     type={curUser ? categorizeUser(u, curUser) : userTypes.OTHER}
                                                                                     user={u}/>)}
                        </List>
                    </div>
                    :
                    <>
                        <div onClick={openUserInfo} className={'ChatsSectionDlgPn'}>
                            <div className={'ChatsSectionHeaderDlgPn'}>
                                Друзья
                            </div>
                            {
                                friends.length ?
                                    <List>{friends.map((u: IUser): React.ReactNode => <UserSelector
                                        clearInput={clearInput} key={u._id}
                                        type={userTypes.FRIEND}
                                        user={u}/>)}</List> : 'Друзей нет'
                            }
                        </div>
                        <div onClick={openUserInfo} className={'ChatsSectionDlgPn'}>
                            <div className={'ChatsSectionHeaderDlgPn'}>
                                Подписки
                            </div>
                            {
                                subscriptions.length ?
                                    <List>{subscriptions.map((u: IUser): React.ReactNode => <UserSelector
                                        clearInput={clearInput} key={u._id}
                                        type={userTypes.SUBSCRIPTIONS}
                                        user={u}/>)}</List> : 'Подписок нет'
                            }
                        </div>
                        <div onClick={openUserInfo} className={'ChatsSectionDlgPn'}>
                            <div className={'ChatsSectionHeaderDlgPn'}>
                                Подписчики
                            </div>
                            {
                                subscribers.length ?
                                    <List>{subscribers.map((u: IUser): React.ReactNode => <UserSelector
                                        clearInput={clearInput} key={u._id}
                                        type={userTypes.SUBSCRIBERS}
                                        user={u}/>)}</List> : 'Подписчиков нет'
                            }
                        </div>
                    </>
            }
        </>
    );
};
export default ContactsOnDialogPanel;
