import React from "react";
import { throttle } from 'throttle-debounce';
import connectionConfig from "../../../configs/connectionConfig";
import {loadContacts} from "../../../redux/actions";
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";

type propTypes = {
    input: string,
    setInput: React.Dispatch<React.SetStateAction<string>>
};
const SearchMesPanel: React.FC<propTypes> = ({ input, setInput}) => {
    const dispatch: Dispatch = useDispatch();
    const onInputHandler: (x: string) => Promise<void> = throttle(connectionConfig.throttleTime, false, async (name: string): Promise<void> => {
        setInput(name);
        dispatch(loadContacts(name));
    });
    return (
        <div className={'searchMessPanel'}>
            <input value={input} className={'searchMessPanelInput'} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {onInputHandler(e.target.value)}} placeholder={'Имя собеседника или чата'} type={'text'}/>
        </div>
    );
};
export default SearchMesPanel;
