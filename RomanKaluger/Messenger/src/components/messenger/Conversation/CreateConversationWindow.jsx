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
import {push} from "connected-react-router";

export const CreateConversationWindow = () => {
    const {curUser, contacts} = useSelector(s => s.app);
    const {createConversationOpen } = useSelector(s => s.system);
    const [title, setTitle] = useState(`Беседа пользователя ${curUser.name}`);
    const [members, setMembers] = useState([]);
    const titleField = useRef();
    const dispatch = useDispatch();
    const selectMembers = (e) => {
        const memberId = e.target.dataset.memberId;
        if (memberId){
            const newMembers = members.includes(memberId) ? members.filter(x => x!==memberId): [...members, memberId];
            setMembers(newMembers);
        }
    };
    const createConversationHandler = () => {
        if (!title){
            swal('Ошибка', 'Поле названия не может быть пустым', 'error');
            return;
        }
        dispatch(openCreateConversation(false));
        dispatch(createConversation({members, title}));
    };
    const onChangeTitle = useCallback((e) => {
        setTitle(e.target.value);
        if (!e.target.value){
            titleField.current.style.border = '2px solid red';
        } else {
            titleField.current.style.border = '2px solid transparent';
        }
    },[]);
    return (
                    <Backdrop open={createConversationOpen}>
                        <form name={'createConversationForm'} id={'createConversationForm'} className={'createConversationContainer'}>
                            <div className={'primaryHeader'}>Создание беседы</div>
                            <TextField ref={titleField} name={'titleConversation'} label="Название" onChange={onChangeTitle} value={title} variant="filled"/>
                            <div onClick={selectMembers} className="memberSelectorContainer">
                                <div className={'secondaryHeader'}>Выберите участников</div>
                                {
                                    contacts.friends.length
                                        ?  contacts.friends.map(fr =>
                                        <div key={fr._id} data-member-id={fr._id} className={classNames('chatSelector', {chatSelectorSelected: members.includes(fr._id)})}>
                                            <AvatarUser user={fr} classType={avatarSizeCls.big}/>
                                            <div className={'chatSelectorTitle'}>
                                                {fr.name}
                                            </div>
                                        </div>
                                        )
                                        : <div className="NoteText">У вас нет друзей, чтобы создать беседу, сначала добавьте их</div>
                                }
                            </div>

                            <div className="controlBtnsContainer">
                                <div onClick={() => dispatch(openCreateConversation(false))} className="button">Отмена</div>
                                <div onClick={createConversationHandler} className="button">Создать</div>
                            </div>
                            <CloseWindow actionClose={() => dispatch(openCreateConversation(false))}/>
                        </form>
                    </Backdrop>


    );
};
