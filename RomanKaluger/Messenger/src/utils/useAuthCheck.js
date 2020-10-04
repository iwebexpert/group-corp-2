import {useSelector} from "react-redux";
import React from "react";
import {useHistory} from "react-router-dom";
import routesPaths from "../configs/routesPaths";
import {PAGE_CURRENT} from "../configs/statuses";

export default (redirect) => {
    const history = useHistory();
    const curUser = useSelector(s => s.app.curUser);
    const isAuth = curUser && curUser.token;
    setTimeout(() =>{
        if (!isAuth) {
            history.push(routesPaths.AUTH);
        } else {
            if (redirect === PAGE_CURRENT){
                return;
            }
            history.push(redirect || routesPaths.MESSENGER);
        }
    },0);
}
