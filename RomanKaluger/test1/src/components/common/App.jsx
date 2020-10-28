import React from "react";
import MessagesPage from "../messenger/MessagesPage";
import {useEffect} from "react";
import {initializeWs} from "../../utils/initializeWs";
import {destroyWs} from "../../utils/destroyWs";
import {useSelector} from 'react-redux';
import routesPaths from "../../configs/routesPaths";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Authorization from "../auth/Authorization";
import Registration from "../auth/Registration";
import UserProfile from "../messenger/UserProfile/UserProfile";
import {ConnectedRouter} from 'connected-react-router';
import {history} from "../../redux/StorageRedux";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import {About} from "./About";
import {Error} from "./Error";

export default () => {
    const {curUser} = useSelector(s => s.app);
    const {loading} = useSelector(s => s.system);
    const id = curUser ? curUser._id : null;
    useEffect(() => {
        if (curUser) {
            initializeWs(curUser);
            return destroyWs;
        }
    }, [id]);
    return (
        <>
            <div className={'mainBackDropCont'}>
                <Backdrop open={loading || false}>
                    <CircularProgress/>
                </Backdrop>
               <Error/>
            </div>
            <About/>
            <UserProfile/>
            <ConnectedRouter history={history}>
                <div className={'appContainer'}>
                    <Switch>
                        <Route path={routesPaths.MESSENGER}>
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
            </ConnectedRouter>
        </>
    );
}

