import React from "react";
import {Switch, Route, Redirect, NavLink} from 'react-router-dom';
//import {routes} from '../../routes'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faHome,
    faNewspaper,
    faComment,
    faUser,
    faUsers,
    faMusic,
    faVideo,
    faCamera
} from '@fortawesome/free-solid-svg-icons';
import {ChatArea} from "./ChatArea";
import MainInfo from "./MainInfo";
import {chats} from "../../helpers/chatsData";
import {ChatAreaContainer} from "../../containers/ChatAreaContainer";

const MenuArea = () => {
    return (
        <>
            <nav className="main-navigation">
                <ul>
                    <li className="main-navigation-item"><NavLink to="/profile">
                        <div className="main-navigation--icon"><FontAwesomeIcon icon={faHome}/></div>
                        Моя страница</NavLink></li>
                    <li className="main-navigation-item"><NavLink to="/chats/new">
                        <div className="main-navigation--icon"><FontAwesomeIcon icon={faComment}/></div>
                        Сообщения</NavLink></li>
                </ul>
            </nav>
            <Switch>
                <Route exact path="/" render={() => (<Redirect to="/chats/new" />)} />
                <Route path="/profile" exact component={MainInfo} />
                <Route path="/chats/new" exact render={()=><ChatAreaContainer newMsg={true}/>} />
                <Route path="/chats/:id([0-9]+)" exact render={(obj)=><ChatAreaContainer id={Number(obj.match.params.id)} newMsg={false}/>} /> 
            </Switch>
        </>
    );
}

export default MenuArea;