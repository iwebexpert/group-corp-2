import {useDispatch, useSelector} from "react-redux";
import React from "react";
import routesPaths from "../configs/routesPaths";
import {PAGE_CURRENT} from "../configs/statuses";
import {push} from 'connected-react-router';
import {history} from "../redux/StorageRedux";

export default (redirect) => {
    const curUser = useSelector(s => s.app.curUser);
    const dispatch = useDispatch();
    const isAuth = curUser && curUser.token;
    const current = history.location.pathname;
    setTimeout(() =>{
        if (!isAuth) {
            if (current === routesPaths.AUTH){
                return;
            }
            dispatch(push(routesPaths.AUTH));
        } else {
            if (redirect === PAGE_CURRENT){
                return;
            }
            dispatch(push(redirect || routesPaths.MESSENGER));
        }
    },0);
}
