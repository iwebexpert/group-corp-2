import {useDispatch, useSelector} from "react-redux";
import React from "react";
import routesPaths from "../configs/routesPaths";
import {PAGE_CURRENT} from "../configs/statuses";
import {push} from 'connected-react-router';
import {history} from "../redux/StorageRedux";
import {IUser} from "../types/globalTypes";
import {ICombinedState} from "../redux/reduxTypes/rdx";
import {Dispatch} from "redux";

export default (redirect: string): void => {
    const curUser: IUser | null = useSelector<ICombinedState, IUser | null>(s => s.app.curUser);
    const dispatch: Dispatch = useDispatch();
    const isAuth: boolean = !!curUser && !!curUser.token;
    const current: string = history.location.pathname;
    setTimeout((): void => {
        if (!isAuth) {
            if (current === routesPaths.AUTH) {
                return;
            }
            dispatch(push(routesPaths.AUTH));
        } else {
            if (redirect === PAGE_CURRENT) {
                return;
            }
            dispatch(push(redirect || routesPaths.MESSENGER));
        }
    }, 0);
}
