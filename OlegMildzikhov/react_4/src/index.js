import React from 'react';
import ReactDom from 'react-dom';
import {Layouts} from 'components/Layout';
import { BrowserRouter,  Switch, Route } from 'react-router-dom';

ReactDom.render(
    <>
        <BrowserRouter>
            <Switch>
                {<Layouts/>}
            </Switch>
        </BrowserRouter>

    </>
, document.getElementById('root'));