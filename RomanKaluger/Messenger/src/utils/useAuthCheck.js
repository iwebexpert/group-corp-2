import {useSelector} from "react-redux";
import React from "react";
import {useHistory} from "react-router-dom";
import routesPaths from "../configs/routesPaths";

export default (curPath) => {
    const history = useHistory();
    const curUser = useSelector(s => s.app.curUser);
    const isAuth = curUser && curUser.token;
    setTimeout(() =>{
        if (!isAuth) {
            history.push(routesPaths.AUTH);
        } else {
            history.push(curPath || routesPaths.MESSENGER);
        }
    },0);
}
