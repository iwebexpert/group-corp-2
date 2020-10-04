import React from 'react';
import ReactDom from 'react-dom';

import {Home} from 'pages/Home';
import {About} from 'pages/About';
import {Error} from 'pages/Error';

class AppRouting extends React.Component {
    state = {
        route: this.hashLocation,
    };

    get hashLocation(){
        return window.location.hash.substr(1);
    }

    get Route(){
        switch(this.state.route){
            case '':
            case '/':
                return Home;
            case '/about':
                return About;
            default:
                return Error;
        }
    }

    routeHandler = () => {
        this.setState({route: this.hashLocation});
    }

    componentDidMount(){
        window.addEventListener('hashchange', this.routeHandler);
    }

    componentWillUnmount(){
        window.removeEventListener('hashchange', this.routeHandler);
    }

    render(){
        let Child = this.Route;
        return (
            <div>
                <ul>
                    <li><a href="#/">Главная страница</a></li>
                    <li><a href="#/about">О нас</a></li>
                    <li><a href="#/pagenotfound">Случайная страница</a></li>
                </ul>
                <div>
                    <Child />
                </div>
            </div>
        );
    }
}

ReactDom.render(
    <>
        <AppRouting />
    </>, 
    document.getElementById('root')
);