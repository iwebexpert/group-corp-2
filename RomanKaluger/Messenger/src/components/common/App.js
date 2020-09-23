import React from "react";
import MessagesPage from "../messenger/MessagesPage";
import {useEffect} from "react";
import {initializeApp} from "../../utils/initializeApp";
import {destroyApp} from "../../utils/destroyApp";
import {Provider} from 'react-redux';
import {store} from './../../redux/StorageRedux';
import routesPaths from "../../configs/routesPaths";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Authorization from "../auth/Authorization";
import Registration from "../auth/Registration";

export default () => {
    useEffect(() => {
        initializeApp();
        return destroyApp;
        },[]);
    return (
        <Provider store={store}>
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
        </Provider>
    );
}

