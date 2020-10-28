import React from 'react';
import { Switch, Route } from "react-router-dom";

import { Profile } from './../pages/Profile';
import { Home } from './../pages/Home';
import { Error } from './../pages/Error';

import { LayoutContainer } from '../containers/LayoutContainerClass';
import { NavbarContainer } from '../containers/NavbarContainerClass';

const Messenger = () => {

    return (
        <div className="container">
            <div className="messenger">
                <div className="messenger__navbar  navbar">
                    <NavbarContainer />
                </div>

                <div className="content">
                    <Switch>
                        <Route path="/chats/:id([0-9]+)" component={LayoutContainer} exact />
                        <Route path="/profile" exact><Profile /></Route>
                        <Route path="/" exact><Home /></Route>
                        <Route path="*"><Error /></Route>
                    </Switch>
                </div>
            </div>
        </div>

    )
}

export default Messenger;