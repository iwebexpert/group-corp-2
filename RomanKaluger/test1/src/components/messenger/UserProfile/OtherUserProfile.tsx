import React, {useCallback, useState} from "react";
import {categorizeUser, getUserNote} from "../../../utils/helpers";
import {DbWorker} from "../../../utils/DbWorker";
import {useSelector} from "react-redux";
import classNames from 'classnames';
import {userTypes} from "../ContactsDialogPanel/userTypes";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {IAppState, ICombinedState} from "../../../redux/reduxTypes/rdx";
import {IUser} from "../../../types/globalTypes";

type propTypes = {
    user: IUser
};

enum ContactsActions {
    addFriend = 'addFriend',
    removeFriend = 'removeFriend'
}

const OtherUserProfile: React.FC<propTypes> = ({user}) => {
    const {curUser} = useSelector<ICombinedState, IAppState>(s => s.app);
    const userCategory: userTypes = curUser ? categorizeUser(user, curUser) : userTypes.OTHER;
    const [isLoad, setIsLoad] = useState<boolean>(false);
    const addFriendClass: string = classNames('button', {'disabled': userCategory === userTypes.SUBSCRIPTIONS || userCategory === userTypes.FRIEND});
    const removeFriendClass: string = classNames('button', {'disabled': userCategory === userTypes.SUBSCRIBERS || userCategory === userTypes.OTHER});
    const contactsActionHandler = useCallback(async (e: React.MouseEvent<HTMLDivElement>): Promise<void> => {
        e.stopPropagation();
        switch ((e.target as HTMLDivElement).dataset.name) {
            case ContactsActions.addFriend: {
                setIsLoad(true);
                await DbWorker.addFriend(user);
                setIsLoad(false);
                break;
            }
            case ContactsActions.removeFriend : {
                setIsLoad(true);
                await DbWorker.removeFriend(user);
                setIsLoad(false);
                break;
            }
            default:
                throw new Error('Кнопка не найдена');
        }
    }, [user]);
    return (
        <div>
            <Backdrop open={isLoad}>
                <CircularProgress/>
            </Backdrop>
            {
                user ?
                    <div onClick={contactsActionHandler} className="PreferencesWindowCard">
                        <div className={"primaryHeader"}>Профиль пользователя</div>
                        <div className="profileCardInfo">
                            <div style={{gridArea: '2 / 2 / 10 / 10'}} className="avatarAbsolute">{user.avatarUrl ?
                                <img src={user.avatarUrl} alt={'Аватар'}/> : user.name.slice(0, 2)}</div>
                            <div style={{gridArea: '2 / 10 / 4 / 15'}} className={"infoText"}>Имя</div>
                            <div style={{gridArea: '5 / 10 / 7 / 15'}} className={"infoText"}>Возраст</div>
                            <div style={{gridArea: '8 / 10 / 10 / 15'}} className={"infoText"}>Пол</div>
                            <div style={{gridArea: '11 / 10 / 13 / 15'}} className={"infoText"}>Город</div>
                            <div style={{gridArea: '14 / 10 / 16 / 15'}} className={"infoText"}>Страна</div>
                            <div style={{gridArea: '17 / 10 / 19 / 15'}} className={"infoText"}>Семейное положение</div>


                            <div style={{gridArea: '2 / 20 / 4 / 25'}} className={"infoText"}>{user.name}</div>
                            <div style={{gridArea: '5 / 20 / 7 / 25'}} className={"infoText"}>{user.age}</div>
                            <div style={{gridArea: '8 / 20 / 10 / 25'}} className={"infoText"}>{user.sex}</div>
                            <div style={{gridArea: '11 / 20 / 13 / 25'}} className={"infoText"}>{user.city}</div>
                            <div style={{gridArea: '14 / 20 / 16 / 25'}} className={"infoText"}>{user.country}</div>
                            <div style={{gridArea: '17 / 20 / 19 / 25'}}
                                 className={"infoText"}>{user.familyStatus}</div>


                            <div style={{gridArea: '26 / 1 / 26 / 27'}}
                                 className={'infoText'}>{getUserNote(userCategory, user)}</div>
                            <div style={{gridArea: '33 / 14 / 35 / 19'}} data-name={'addFriend'}
                                 className={addFriendClass}>Добавить в друзья
                            </div>
                            <div style={{gridArea: '33 / 20 / 35 / 25'}} data-name={'removeFriend'}
                                 className={removeFriendClass}>Удалить из друзей
                            </div>
                        </div>
                    </div>
                    : null
            }
        </div>
    );
};
export default OtherUserProfile;
