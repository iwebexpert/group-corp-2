import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import {Switch, Route, Redirect, NavLink} from 'react-router-dom';
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
import {push} from "connected-react-router";
import {connect} from "react-redux";
import {MainInfoContentContainer} from "../../containers/MainInfoContentContainer";
import {ChatAreaContainer} from "../../containers/ChatAreaContainer";

export const MenuArea = (props) => {
    const dispatch = useDispatch();

    const redirectHandler = () => {
        dispatch(push('/profile'));
    }

    return (
        <>
            <nav className="main-navigation">
                <ul>
                    <li className="main-navigation-item"><div onClick={redirectHandler}>
                        <div className="main-navigation--icon"><FontAwesomeIcon icon={faHome}/></div>
                        Моя страница</div></li>
                    <li className="main-navigation-item"><NavLink to="/chats/new">
                        <div className="main-navigation--icon"><FontAwesomeIcon icon={faComment}/></div>
                        Сообщения</NavLink></li>
                </ul>
            </nav>
            <Switch>
                <Route exact path="/" render={() => (<Redirect to="/profile" />)} />
                <Route path="/profile" exact component={MainInfoContentContainer} />
                <Route path="/chats/new" exact render={()=><ChatAreaContainer newMsg={true}/>} />
                <Route path="/chats/:id([0-9]+)" exact render={(obj)=><ChatAreaContainer id={Number(obj.match.params.id)} newMsg={false}/>} />
            </Switch>
        </>
    );
}
