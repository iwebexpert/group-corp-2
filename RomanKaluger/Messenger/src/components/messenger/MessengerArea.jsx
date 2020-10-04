import React from "react";
import MessengerTopPanel from "./MessengerTopPanel";
import MessagesArea from "./MessagesArea/MessagesArea";
import InputMessageArea from "./InputMessageArea";
import useAuthCheck from "../../utils/useAuthCheck";
import {useSelector} from "react-redux";
import {Switch, Route} from 'react-router-dom';
import routesPaths from "../../configs/routesPaths";
import {PAGE_CURRENT} from "../../configs/statuses";

export default () => {
    useAuthCheck(PAGE_CURRENT);
    const curChat = useSelector(s => s.app.selectedChat);
    return (
        <div className={'MessengerArea'}>
          <MessengerTopPanel chat={curChat}/>
                    <Switch>
                        <Route path={routesPaths.MESSENGER} exact>
                            <div className="emptyMessengerArea">Сперва Выберите чат на панели слева</div>
                        </Route>
                        <Route path={routesPaths.CHAT}>
                            <MessagesArea curChat={curChat}/>
                            <InputMessageArea/>
                        </Route>
                    </Switch>
        </div>
    );
}
