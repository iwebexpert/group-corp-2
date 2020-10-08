import React from 'react';
import ReactDom from 'react-dom';
import {routes} from './components/Router'
import {Layouts} from "components/Layout"
import { BrowserRouter,  Switch, Route } from 'react-router-dom';

ReactDom.render(
    <>
        <BrowserRouter>
            <Switch>
                {<Layouts/>}
                {/*{routes.map((route, index) => (<Route key={index} {...route} />))}*/}
            </Switch>
        </BrowserRouter>

    </>
, document.getElementById('root'));