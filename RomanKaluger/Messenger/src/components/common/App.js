import React from "react";
import MessagesPage from "../messenger/MessagesPage";
import {useEffect} from "react";
import {initializeWs} from "../../utils/initializeWs";
import {destroyWs} from "../../utils/destroyWs";
import {useSelector} from 'react-redux';
import routesPaths from "../../configs/routesPaths";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Authorization from "../auth/Authorization";
import Registration from "../auth/Registration";

export default () => {
    const curUser = useSelector(s => s.app.curUser);
    const id = curUser ? curUser._id : null;
    useEffect(() => {
        if (curUser){
            initializeWs(curUser);
            return destroyWs;
        }
        },[id]);
    return (
            <Router>
                <div className={'appContainer'}>
                    <Switch>
                        <Route exact path={routesPaths.MESSENGER}>
                                <MessagesPage/>
                        </Route>
                        <Route path={routesPaths.REGISTER}>
                            <Registration/>
                        </Route>
                        <Route path={routesPaths.AUTH}>
                            <Authorization/>
                        </Route>
                        <Route path="*">
                            <Redirect to={routesPaths.AUTH}/>
                        </Route>
                    </Switch>
                </div>
            </Router>
    );
}

