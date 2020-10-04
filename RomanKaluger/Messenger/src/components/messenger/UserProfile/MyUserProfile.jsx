import React, {useEffect, useRef, useState} from "react";
import classNames from 'classnames';
import {DbWorker} from "../../../utils/DbWorker";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import {activateBtn, disableBtn} from "../../../utils/helpers";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";


export default function ({user}) {
    const [editorMode, setEditorMode] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const editorBtnClass = classNames('button', {'disabled': editorMode});
    const cancelSaveBtnClass = classNames('button', {'disabled': !editorMode});

    const formRef = useRef();
    const [selectedSex, setSelectedSex] = useState(user.sex);
    useEffect(() => {
        setSelectedSex(user.sex);
    },[user.sex]);
    const saveChanges = async () =>{
        setEditorMode(false);
        const form = formRef.current;
        if (form){
            setIsLoad(true);
            await DbWorker.updateUser(form.elements);
            setIsLoad(false);
        }
    };
    return (

        <div>
            <Backdrop open={isLoad}>
                <CircularProgress/>
            </Backdrop>
            {
                user ?
                    <div className="PreferencesWindowCard">
                        <div className={"primaryHeader"}>Профиль пользователя</div>
                        <form ref={formRef} className={'CardInfoForm'} noValidate autoComplete="off">
                        <div className="profileCardInfo">
                            <div style={{gridArea: '2 / 2 / 10 / 10'}} className="avatarAbsolute">{user.avatarUrl ? <img src={user.avatarUrl} alt={'Аватар'}/> : user.name.slice(0,2)}</div>
                            <div style={{gridArea: '2 / 10 / 4 / 15'}} className={"infoText"}>Имя</div>
                            <div style={{gridArea: '5 / 10 / 7 / 15'}} className={"infoText"}>Возраст</div>
                            <div style={{gridArea: '8 / 10 / 10 / 15'}} className={"infoText"}>Пол</div>
                            {
                                editorMode ?
                                    <>
                                        <div className="editorField1">
                                            <TextField name={'Name'} required label="Имя" defaultValue={user.name} variant="filled"/>
                                        </div>
                                        <div className="editorField2">
                                            <TextField  name={'Age'} label="Возраст" defaultValue={user.age} variant="filled"/>
                                        </div>
                                        <div className="editorField3">
                                            <FormControl component="fieldset">
                                                <RadioGroup aria-label="gender" name="Sex" value={selectedSex} onChange={(e)=> setSelectedSex(e.target.value)}>
                                                    <FormControlLabel value="Мужской" control={<Radio/>} label="Мужской" />
                                                    <FormControlLabel value="Женский" control={<Radio/>} label="Женский" />
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                        <div className="editorField4">
                                            <TextField name={'AvaUrl'} label="Avatar Url" defaultValue={user.avatarUrl} variant="filled"/>
                                        </div>
                                        </>
                                           :
                                 <>
                                     <div style={{gridArea:'2 / 25 / 4 / 30'}} className={"infoText"}>{user.name}</div>
                                     <div style={{gridArea:'5 / 25 / 7 / 30'}} className={"infoText"}>{user.age}</div>
                                     <div style={{gridArea:'8 / 25 / 10 / 30'}} className={"infoText"}>{user.sex}</div>
                                 </>
                            }
                            <div style={{gridArea:'33 / 2 / 35 / 7'}} onClick={() => setEditorMode(true)} className={editorBtnClass}>Редактировать</div>
                            <div style={{gridArea:'33 / 15 / 35 / 25'}} onClick={() => setEditorMode(false)} className={cancelSaveBtnClass}>Отменить</div>
                            <div style={{gridArea:'33 / 25 / 35 / 35'}} onClick={saveChanges} className={cancelSaveBtnClass}>Сохранить</div>
                        </div>
                        </form>
                    </div>
                    : null
            }
        </div>
    );
}
