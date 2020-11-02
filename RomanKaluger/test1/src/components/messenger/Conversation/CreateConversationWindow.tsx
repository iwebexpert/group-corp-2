import React, {useCallback, useRef, useState} from "react";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import {useDispatch, useSelector} from "react-redux";
import TextField from "@material-ui/core/TextField/TextField";
import classNames from 'classnames';
import './conversation.scss';
import {createConversation, openCreateConversation, openUserProfile, setSelectedChat} from "../../../redux/actions";
import swal from "sweetalert";
import {CloseWindow} from "../../common/CloseWindow";
import {AvatarUser} from "../../common/Avatar";
import {avatarSizeCls} from "../../../configs/statuses";
import {IAppState, ICombinedState, ISystemState} from "../../../redux/reduxTypes/rdx";
import {IUser} from "../../../types/globalTypes";
import {Dispatch} from "redux";

export const CreateConversationWindow: React.FC = () => {
    const {curUser, contacts} = useSelector<ICombinedState, IAppState>(s => s.app);
    const {createConversationOpen} = useSelector<ICombinedState, ISystemState>(s => s.system);
    const [title, setTitle] = useState<string>(`Беседа пользователя ${curUser?.name}`);
    const [members, setMembers] = useState<string[]>([]);
    const titleField: React.Ref<HTMLInputElement> = useRef(null);
    const dispatch: Dispatch = useDispatch();
    const selectMembers: React.MouseEventHandler = (e: React.MouseEvent<HTMLDivElement>): void => {
        const memberId: string | undefined = (e.target as HTMLDivElement).dataset.memberId;
        if (memberId) {
            const newMembers: string[] = members.includes(memberId) ? members.filter((x: string): boolean => x !== memberId) : [...members, memberId];
            setMembers(newMembers);
        }
    };
    const createConversationHandler: React.MouseEventHandler = (): void => {
        if (!title) {
            swal('Ошибка', 'Поле названия не может быть пустым', 'error');
            return;
        }
        dispatch(openCreateConversation(false));
        dispatch(createConversation({members, title}));
    };
    const onChangeTitle: React.ChangeEventHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
        if (titleField.current) {
            setTitle(e.target.value);
            if (!e.target.value) {
                titleField.current.style.border = '2px solid red';
            } else {
                titleField.current.style.border = '2px solid transparent';
            }
        }
    }, []);
    return (
        <Backdrop open={createConversationOpen}>
            <form name={'createConversationForm'} id={'createConversationForm'}
                  className={'createConversationContainer'}>
                <div className={'primaryHeader'}>Создание беседы</div>
                <TextField ref={titleField} name={'titleConversation'} label="Название" onChange={onChangeTitle}
                           value={title} variant="filled"/>
                <div onClick={selectMembers} className="memberSelectorContainer">
                    <div className={'secondaryHeader'}>Выберите участников</div>
                    {
                        contacts.friends.length
                            ? contacts.friends.map((fr: IUser): React.ReactNode =>
                                <div key={fr._id} data-member-id={fr._id}
                                     className={classNames('chatSelector', {chatSelectorSelected: members.includes(fr._id)})}>
                                    <AvatarUser user={fr} classType={avatarSizeCls.Big}/>
                                    <div className={'chatSelectorTitle'}>
                                        {fr.name}
                                    </div>
                                </div>
                            )
                            :
                            <div className="NoteText">У вас нет друзей, чтобы создать беседу, сначала добавьте их</div>
                    }
                </div>

                <div className="controlBtnsContainer">
                    <div onClick={(): void => {
                        dispatch(openCreateConversation(false))
                    }} className="button">Отмена
                    </div>
                    <div onClick={createConversationHandler} className="button">Создать</div>
                </div>
                <CloseWindow actionClose={(): void => {
                    dispatch(openCreateConversation(false))
                }}/>
            </form>
        </Backdrop>


    );
};
