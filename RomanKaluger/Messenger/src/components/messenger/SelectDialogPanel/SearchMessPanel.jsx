import React from "react";
import { throttle } from 'throttle-debounce';
import connectionConfig from "../../../configs/connectionConfig";

export default React.forwardRef(({search}, ref) => {
    const onInputHandler = throttle(connectionConfig.throttleTime, false, (name) => {
        search(name);
    });
    return (
        <div className={'searchMessPanel'}>
            <input ref={ref} className={'searchMessPanelInput'} onChange={(e) => onInputHandler(e.target.value)} placeholder={'Имя собеседника или чата'} type={'text'}/>
        </div>
    );
});
