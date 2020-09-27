import React, {useCallback} from 'react';
import {setCurrentUser} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import routesPaths from "../../configs/routesPaths";

export default function () {
    const dispatch = useDispatch();
    const curUser = useSelector(s => s.app.curUser);
    const history = useHistory();
    const unAuthorize = useCallback(() => {
        dispatch(setCurrentUser(null));
        history.push(routesPaths.AUTH);
    });
    return(
        <div className={'ShortMenuContainer'}>
            <div className={'shortMenuGreeting'}> {`Привет, ${curUser.name}`}</div>
            <div onClick={unAuthorize} className={'UnAuthorizeBtn'}>Выйти</div>
        </div>
    );
}
