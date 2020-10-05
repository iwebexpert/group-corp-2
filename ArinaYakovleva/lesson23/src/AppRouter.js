import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {Home} from './pages/Home';
import {About} from './pages/About';
import {Error} from './pages/Error';

class AppRouter extends Component{
    constructor(props){
        super(props);
        this.state = {
            route: this.route,
        }
        this.handleRouteChange = this.handleRouteChange.bind(this);
    }

    get route(){
        return window.location.hash.substr(1);
    }

    get ComponentChild(){
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
    handleRouteChange(){
        this.setState({
            route: this.route,
        });
    }

    componentDidMount(){
        window.addEventListener('hashchange',this.handleRouteChange);
    }

    componentWillUnmount(){
        window.removeEventListener('hashchange',this.handleRouteChange);
    }

    render(){
        const Child = this.ComponentChild;

        return (
            <div>
                <ul>
                    <li><a href="#/">Main page</a></li>
                    <li><a href="#/about">About us</a></li>
                    <li><a href="#/pagenorfound">Error page</a></li>
                </ul>
                <div>
                    <Child />
                </div>
            </div>
        );
    }
}

ReactDom.render(<AppRouter />, document.getElementById('root'));