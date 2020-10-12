import React from 'react';
import ReactDom from 'react-dom';
import {routes} from './components/Router'
import {Layouts} from "components/Layout"
import { BrowserRouter,  Switch, Route } from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './store';


ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                {<Layouts/>}
            </Switch>
        </BrowserRouter>
    </Provider>
, document.getElementById('root'));