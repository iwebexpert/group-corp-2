import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import {routes} from '../../routes';
export class App extends Component{
    render(){
        return(
            <>
                    <Switch>
                    {routes.map((route, index) => (<Route key={index} {...route} />))}
                        
                    </Switch>


            </>
        );
    }
}