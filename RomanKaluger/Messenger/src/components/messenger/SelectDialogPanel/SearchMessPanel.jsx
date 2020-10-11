import React from "react";
import { throttle } from 'throttle-debounce';
import connectionConfig from "../../../configs/connectionConfig";
import {UpdaterMessenger} from "./UpdaterMessenger";

export default ({ input, setInput,setLoading}) => {
    const onInputHandler = throttle(connectionConfig.throttleTime, false, async (name) => {
        setInput(name);
        setLoading(true);
        await UpdaterMessenger.updateContacts(name);
        setLoading(false);
    });
    return (
        <div className={'searchMessPanel'}>
            <input value={input} className={'searchMessPanelInput'} onChange={(e) => onInputHandler(e.target.value)} placeholder={'Имя собеседника или чата'} type={'text'}/>
        </div>
    );
};
