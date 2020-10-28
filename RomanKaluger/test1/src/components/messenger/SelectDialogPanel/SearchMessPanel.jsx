import React from "react";
import { throttle } from 'throttle-debounce';
import connectionConfig from "../../../configs/connectionConfig";
import {loadContacts} from "../../../redux/actions";
import {useDispatch} from "react-redux";

export default ({ input, setInput}) => {
    const dispatch = useDispatch();
    const onInputHandler = throttle(connectionConfig.throttleTime, false, async (name) => {
        setInput(name);
        dispatch(loadContacts(name));
    });
    return (
        <div className={'searchMessPanel'}>
            <input value={input} className={'searchMessPanelInput'} onChange={(e) => onInputHandler(e.target.value)} placeholder={'Имя собеседника или чата'} type={'text'}/>
        </div>
    );
};
