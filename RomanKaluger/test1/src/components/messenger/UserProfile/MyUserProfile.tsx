import React, {useEffect, useRef, useState} from "react";
import classNames from 'classnames';
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import {useDispatch} from "react-redux";
import {updateUser} from "../../../redux/actions";
import {IUser} from "../../../types/globalTypes";
import {Dispatch} from "redux";
import {IInputUpdate} from "../../../utils/DbWorker";

type propTypes = {
    user: IUser;
};
const MyUserProfile: React.FC<propTypes> = ({user}) => {
    const [editorMode, setEditorMode] = useState<boolean>(false);
    const editorBtnClass: string = classNames('button', {'disabled': editorMode});
    const cancelSaveBtnClass: string = classNames('button', {'disabled': !editorMode});
    const dispatch: Dispatch = useDispatch();
    const formRef: React.Ref<HTMLFormElement> = useRef(null);
    const [selectedSex, setSelectedSex] = useState<string>(user.sex);
    const [selectedFamilyStatus, setSelectedFamilyStatus] = useState<string>(user.familyStatus);

    useEffect((): void => {
        setSelectedSex(user.sex);
    }, [user.sex]);
    const saveChanges = async (): Promise<void> => {
        setEditorMode(false);
        const form: HTMLFormElement | null = formRef.current;
        if (form) {
            dispatch(updateUser(form.elements as IInputUpdate));
        }
    };
    return (
        <div>
            {
                user ?
                    <div className="PreferencesWindowCard">
                        <div className={"primaryHeader"}>Профиль пользователя</div>
                        <form ref={formRef} className={'CardInfoForm'} noValidate autoComplete="off">
                            <div className="profileCardInfo">
                                <div style={{gridArea: '2 / 2 / 10 / 10'}} className="avatarAbsolute">{user.avatarUrl ?
                                    <img src={user.avatarUrl} alt={'Аватар'}/> : user.name.slice(0, 2)}</div>
                                <div style={{gridArea: '2 / 10 / 4 / 15'}} className={"infoText"}>Имя</div>
                                <div style={{gridArea: '5 / 10 / 7 / 15'}} className={"infoText"}>Возраст</div>
                                <div style={{gridArea: '8 / 10 / 10 / 15'}} className={"infoText"}>Пол</div>
                                <div style={{gridArea: '11 / 10 / 13 / 15'}} className={"infoText"}>Город</div>
                                <div style={{gridArea: '14 / 10 / 16 / 15'}} className={"infoText"}>Страна</div>
                                <div style={{gridArea: '17 / 10 / 19 / 15'}} className={"infoText"}>Семейное положение
                                </div>
                                {
                                    editorMode ?
                                        <>
                                            <div className="editorField1">
                                                <TextField name={'Name'} required label="Имя" defaultValue={user.name}
                                                           variant="filled"/>
                                            </div>
                                            <div className="editorField2">
                                                <TextField name={'Age'} label="Возраст" defaultValue={user.age}
                                                           variant="filled"/>
                                            </div>
                                            <div className="editorField3">
                                                <FormControl component="fieldset">
                                                    <RadioGroup aria-label="gender" name="Sex" value={selectedSex}
                                                                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setSelectedSex(e.target.value)}>
                                                        <FormControlLabel value="Мужской" control={<Radio/>}
                                                                          label="Мужской"/>
                                                        <FormControlLabel value="Женский" control={<Radio/>}
                                                                          label="Женский"/>
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                            <div className="editorField5">
                                                <TextField name={'City'} required label="Город" defaultValue={user.city}
                                                           variant="filled"/>
                                            </div>
                                            <div className="editorField6">
                                                <TextField name={'Country'} label="Страна" defaultValue={user.country}
                                                           variant="filled"/>
                                            </div>
                                            <div className="editorField7">
                                                <FormControl component="fieldset">
                                                    <RadioGroup aria-label="familyStatus" name="familyStatus"
                                                                value={selectedFamilyStatus}
                                                                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setSelectedFamilyStatus(e.target.value)}>
                                                        <FormControlLabel value="Женат(Замужем)" control={<Radio/>}
                                                                          label="Женат(Замужем)"/>
                                                        <FormControlLabel value="Свободен(а)" control={<Radio/>}
                                                                          label="Свободен(а)"/>
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                            <div className="editorField4">
                                                <TextField name={'AvaUrl'} label="Avatar Url"
                                                           defaultValue={user.avatarUrl} variant="filled"/>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div style={{gridArea: '2 / 20 / 4 / 25'}}
                                                 className={"infoText"}>{user.name}</div>
                                            <div style={{gridArea: '5 / 20 / 7 / 25'}}
                                                 className={"infoText"}>{user.age}</div>
                                            <div style={{gridArea: '8 / 20 / 10 / 25'}}
                                                 className={"infoText"}>{user.sex}</div>
                                            <div style={{gridArea: '11 / 20 / 13 / 25'}}
                                                 className={"infoText"}>{user.city}</div>
                                            <div style={{gridArea: '14 / 20 / 16 / 25'}}
                                                 className={"infoText"}>{user.country}</div>
                                            <div style={{gridArea: '17 / 20 / 19 / 25'}}
                                                 className={"infoText"}>{user.familyStatus}</div>
                                        </>
                                }
                                <div style={{gridArea: '33 / 2 / 35 / 7'}} onClick={(): void => setEditorMode(true)}
                                     className={editorBtnClass}>Редактировать
                                </div>
                                <div style={{gridArea: '33 / 15 / 35 / 20'}} onClick={(): void => setEditorMode(false)}
                                     className={cancelSaveBtnClass}>Отменить
                                </div>
                                <div style={{gridArea: '33 / 20 / 35 / 25'}} onClick={saveChanges}
                                     className={cancelSaveBtnClass}>Сохранить
                                </div>
                            </div>
                        </form>
                    </div>
                    : null
            }
        </div>
    );
};
export default MyUserProfile;
